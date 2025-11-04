import type { ReactNode } from 'react'
import './DeviceFrame.css'

/**
 * Device type options for responsive preview frames
 */
type DeviceType = 'mobile' | 'tablet' | 'desktop'

/**
 * Props for DeviceFrame component
 */
interface DeviceFrameProps {
  /** Type of device frame to render */
  type: DeviceType
  /** Content to display inside the device frame */
  children: ReactNode
}

/**
 * MobileFrame - Renders a mobile device frame with status bar and home indicator
 * Displays content in a mobile-sized viewport (320×640px)
 */
export function MobileFrame({ children }: { children: ReactNode }) {
  return (
    <div className="device-frame device-frame--mobile" data-view="mobile" aria-label="Mobile preview">
      <div className="device-screen">
        <div className="status-bar" aria-hidden="true">
          <span>9:41</span>
          <div className="status-bar__signal">
            <span className="status-icon" />
          </div>
          <div className="status-bar__battery">
            <span>87%</span>
            <span className="status-battery" />
          </div>
        </div>

        <div className="device-content">
          {children}
        </div>

        <div className="home-indicator" aria-hidden="true" />
      </div>
    </div>
  )
}

/**
 * TabletFrame - Renders a tablet device frame with status bar and home indicator
 * Displays content in a tablet-sized viewport (744×560px)
 */
export function TabletFrame({ children }: { children: ReactNode }) {
  return (
    <div className="device-frame device-frame--tablet" data-view="tablet" aria-label="Tablet preview">
      <div className="device-screen">
        <div className="status-bar" aria-hidden="true">
          <span>10:24</span>
          <div className="status-bar__signal">
            <span className="status-icon" />
          </div>
          <div className="status-bar__battery">
            <span>74%</span>
            <span className="status-battery" />
          </div>
        </div>

        <div className="device-content">
          {children}
        </div>

        <div className="home-indicator" aria-hidden="true" />
      </div>
    </div>
  )
}

/**
 * DesktopFrame - Renders a desktop browser frame with browser chrome
 * Displays content in a desktop-sized viewport (960×560px)
 */
export function DesktopFrame({ children }: { children: ReactNode }) {
  return (
    <div className="device-frame device-frame--desktop" data-view="desktop" aria-label="Desktop preview">
      <div className="device-screen">
        <div className="browser-bar" aria-hidden="true">
          <div className="browser-bar__dots">
            <span />
            <span />
            <span />
          </div>
          <div className="browser-bar__address">
            <span>ui.artifact.design/preview</span>
          </div>
          <div className="browser-bar__actions">
            <span />
            <span />
            <span />
          </div>
        </div>

        <div className="device-content">
          {children}
        </div>
      </div>
    </div>
  )
}

/**
 * DeviceFrame - Generic device frame component that renders the appropriate frame based on type prop
 * @param type - The device type to render (mobile, tablet, or desktop)
 * @param children - Content to display inside the device frame
 */
export function DeviceFrame({ type, children }: DeviceFrameProps) {
  switch (type) {
    case 'mobile':
      return <MobileFrame>{children}</MobileFrame>
    case 'tablet':
      return <TabletFrame>{children}</TabletFrame>
    case 'desktop':
      return <DesktopFrame>{children}</DesktopFrame>
    default:
      return <MobileFrame>{children}</MobileFrame>
  }
}
