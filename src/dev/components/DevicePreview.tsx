import { useState } from 'react'
import type { ReactNode } from 'react'
import { DeviceFrame } from './DeviceFrame'
import './DevicePreview.css'

/**
 * Supported device types for preview
 */
type DeviceType = 'mobile' | 'tablet' | 'desktop'

/**
 * Configuration for each device view tab
 */
interface ViewTab {
  /** Device type identifier */
  type: DeviceType
  /** Display label for the tab */
  label: string
  /** Metadata text (device name and resolution) */
  meta: string
}

/**
 * Props for DevicePreview component
 */
interface DevicePreviewProps {
  /** Initial device view to display. Defaults to 'mobile' */
  defaultView?: DeviceType
  /** Content to render inside the device frame */
  children: ReactNode
}

const viewTabs: ViewTab[] = [
  {
    type: 'mobile',
    label: 'Mobile',
    meta: 'iPhone 14 • 390×844',
  },
  {
    type: 'tablet',
    label: 'Tablet',
    meta: 'iPad Air • 820×1180',
  },
  {
    type: 'desktop',
    label: 'Web',
    meta: 'Desktop • 1280×800',
  },
]

/**
 * DevicePreview - Main component that provides tabbed interface for previewing content across different device breakpoints
 * Allows switching between mobile, tablet, and desktop views with scrollable content area
 * 
 * @example
 * ```tsx
 * <DevicePreview defaultView="mobile">
 *   <YourComponent />
 * </DevicePreview>
 * ```
 */
export function DevicePreview({ defaultView = 'mobile', children }: DevicePreviewProps) {
  const [activeView, setActiveView] = useState<DeviceType>(defaultView)

  return (
    <div className="device-preview">
      <div className="device-preview__tabs" role="tablist" aria-label="Device breakpoints">
        {viewTabs.map((tab) => {
          const isActive = tab.type === activeView

          return (
            <button
              key={tab.type}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`device-tab${isActive ? ' is-active' : ''}`}
              onClick={() => setActiveView(tab.type)}
            >
              <span className="device-tab__label">{tab.label}</span>
              <span className="device-tab__meta">{tab.meta}</span>
            </button>
          )
        })}
      </div>

      <div className="device-preview__stage">
        <DeviceFrame type={activeView}>
          {children}
        </DeviceFrame>
      </div>
    </div>
  )
}
