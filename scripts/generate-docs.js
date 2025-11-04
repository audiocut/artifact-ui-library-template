#!/usr/bin/env node

import { readFileSync, writeFileSync, existsSync, readdirSync, statSync } from 'fs';
import { join, extname, basename, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Extract TypeScript interface/type props from component files
 */
function extractPropsFromFile(filePath) {
  try {
    const content = readFileSync(filePath, 'utf-8');
    const props = [];
    
    // More robust regex to match interfaces with nested braces
    const interfacePattern = /(?:export\s+)?interface\s+(\w+)\s*\{/g;
    const typePattern = /(?:export\s+)?type\s+(\w+)\s*=\s*\{/g;
    
    let match;
    
    // Extract interfaces
    while ((match = interfacePattern.exec(content)) !== null) {
      const interfaceName = match[1];
      
      if (interfaceName.includes('Props')) {
        // Find the complete interface block
        const startIdx = match.index + match[0].length;
        const propsBlock = extractBlockContent(content, startIdx);
        const propsList = parsePropsBlock(propsBlock);
        
        props.push({
          interfaceName,
          props: propsList,
        });
      }
    }
    
    // Extract types
    while ((match = typePattern.exec(content)) !== null) {
      const typeName = match[1];
      
      if (typeName.includes('Props')) {
        const startIdx = match.index + match[0].length;
        const propsBlock = extractBlockContent(content, startIdx);
        const propsList = parsePropsBlock(propsBlock);
        
        props.push({
          typeName,
          props: propsList,
        });
      }
    }
    
    return props;
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error.message);
    return [];
  }
}

/**
 * Extract content between braces, handling nested braces
 */
function extractBlockContent(content, startIdx) {
  let braceCount = 1;
  let endIdx = startIdx;
  
  while (braceCount > 0 && endIdx < content.length) {
    if (content[endIdx] === '{') braceCount++;
    if (content[endIdx] === '}') braceCount--;
    endIdx++;
  }
  
  return content.substring(startIdx, endIdx - 1);
}

/**
 * Parse props block and extract individual props with JSDoc comments
 */
function parsePropsBlock(propsBlock) {
  const props = [];
  const lines = propsBlock.split('\n');
  let currentComment = '';
  let inComment = false;
  
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i].trim();
    if (!line) continue;
    
    // Start of JSDoc comment
    if (line.startsWith('/**')) {
      inComment = true;
      currentComment = '';
      // Check if comment is on single line
      if (line.includes('*/')) {
        const commentText = line.replace(/^\/\*\*\s*/, '').replace(/\s*\*\/$/, '').trim();
        currentComment = commentText;
        inComment = false;
      }
      continue;
    }
    
    // Inside JSDoc comment
    if (inComment) {
      if (line.includes('*/')) {
        inComment = false;
        continue;
      }
      // Extract comment text
      const commentText = line.replace(/^\*\s?/, '').trim();
      if (commentText) {
        currentComment = commentText;
      }
      continue;
    }
    
    // Skip regular comments
    if (line.startsWith('//')) continue;
    
    // Match prop: type | prop?: type (more flexible matching)
    const propMatch = line.match(/^(\w+)(\??)\s*:\s*([^\/\n]+)/);
    if (propMatch) {
      const [, name, optional, type] = propMatch;
      
      // Check for inline comment
      const inlineCommentMatch = line.match(/\/\/\s*(.+)$/);
      const inlineComment = inlineCommentMatch ? inlineCommentMatch[1].trim() : '';
      
      props.push({
        name,
        type: type.trim(),
        optional: optional === '?',
        description: inlineComment || currentComment || '',
      });
      currentComment = ''; // Reset comment after use
    }
  }
  
  return props;
}

/**
 * Extract component metadata from file
 */
function extractComponentMetadata(filePath) {
  const content = readFileSync(filePath, 'utf-8');
  const componentName = basename(filePath, extname(filePath));
  
  // Extract JSDoc comments
  const docCommentRegex = /\/\*\*\s*\n([^*]|\*(?!\/))*\*\//g;
  const docComments = [];
  let match;
  
  while ((match = docCommentRegex.exec(content)) !== null) {
    const comment = match[0]
      .replace(/\/\*\*|\*\//g, '')
      .split('\n')
      .map(line => line.replace(/^\s*\*\s?/, '').trim())
      .filter(line => line)
      .join(' ');
    docComments.push(comment);
  }
  
  // Extract function/component declaration
  const functionRegex = /(?:export\s+)?(?:function|const)\s+(\w+)/g;
  const functions = [];
  
  while ((match = functionRegex.exec(content)) !== null) {
    functions.push(match[1]);
  }
  
  // Extract imports
  const importRegex = /import\s+(?:{[^}]+}|[^from]+)\s+from\s+['"]([^'"]+)['"]/g;
  const imports = [];
  
  while ((match = importRegex.exec(content)) !== null) {
    const importPath = match[1];
    if (!importPath.startsWith('.')) {
      imports.push(importPath);
    }
  }
  
  return {
    componentName,
    description: docComments[0] || '',
    exports: functions,
    dependencies: [...new Set(imports)],
  };
}

/**
 * Find all component files recursively
 */
function findComponentFiles(dir, files = []) {
  const items = readdirSync(dir);
  
  for (const item of items) {
    const fullPath = join(dir, item);
    const stat = statSync(fullPath);
    
    if (stat.isDirectory()) {
      if (item !== 'node_modules' && item !== 'dist' && item !== '.git') {
        findComponentFiles(fullPath, files);
      }
    } else if (
      (item.endsWith('.tsx') || item.endsWith('.ts')) &&
      !item.endsWith('.d.ts') &&
      !item.includes('.test.') &&
      !item.includes('.spec.')
    ) {
      files.push(fullPath);
    }
  }
  
  return files;
}

/**
 * Generate component documentation
 */
function generateComponentDocs(srcDir, outputPath) {
  const componentFiles = findComponentFiles(srcDir);
  const documentation = [];
  
  console.log(`Found ${componentFiles.length} component files...`);
  
  for (const filePath of componentFiles) {
    const relativePath = filePath.replace(process.cwd(), '').replace(/^\//, '');
    console.log(`Processing: ${relativePath}`);
    
    const metadata = extractComponentMetadata(filePath);
    const propsInfo = extractPropsFromFile(filePath);
    
    if (metadata.exports.length > 0 || propsInfo.length > 0) {
      documentation.push({
        filePath: relativePath,
        ...metadata,
        props: propsInfo,
      });
    }
  }
  
  // Write documentation to JSON file
  const output = {
    generatedAt: new Date().toISOString(),
    componentsCount: documentation.length,
    components: documentation,
  };
  
  writeFileSync(outputPath, JSON.stringify(output, null, 2), 'utf-8');
  console.log(`\n✅ Documentation generated: ${outputPath}`);
  console.log(`📊 Total components documented: ${documentation.length}`);
}

// Main execution
const srcDir = join(process.cwd(), 'src', 'components');
const outputPath = join(process.cwd(), 'component-docs.json');

if (!existsSync(srcDir)) {
  console.error('❌ Error: src directory not found');
  process.exit(1);
}

console.log('🔍 Generating component documentation...\n');
generateComponentDocs(srcDir, outputPath);
