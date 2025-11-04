import { DevicePreview } from './DevicePreview'

export function ExampleUsage() {
  return (
    <DevicePreview defaultView="mobile">
      <div className="flex flex-col gap-6">
        <section className="bg-black text-white rounded-3xl p-7 flex flex-col gap-4 shadow-xl">
          <h2 className="text-[1.45rem] font-semibold m-0">
            Your Content Here
          </h2>
          <p className="m-0 text-[0.95rem] leading-relaxed opacity-90">
            Pass any React children to the DevicePreview component. It will render
            inside the scrollable device frame with the correct breakpoint styling.
          </p>
          <div className="flex gap-3 flex-wrap">
            <button className="px-4 py-2.5 rounded-full text-[0.85rem] font-medium border-none cursor-pointer bg-white text-black hover:-translate-y-0.5 transition-transform">
              Primary Action
            </button>
            <button className="px-4 py-2.5 rounded-full text-[0.85rem] font-medium border-none cursor-pointer bg-white/20 text-white hover:-translate-y-0.5 transition-transform">
              Secondary Action
            </button>
          </div>
        </section>

        <section className="bg-neutral-100 p-5 rounded-[22px] flex flex-col gap-4">
          <span className="text-xs font-semibold tracking-wider text-neutral-500 uppercase">
            Example List
          </span>

          {[
            { title: 'Item One', desc: 'Description for item one', color: 'bg-black' },
            { title: 'Item Two', desc: 'Description for item two', color: 'bg-neutral-700' },
            { title: 'Item Three', desc: 'Description for item three', color: 'bg-neutral-600' },
            { title: 'Item Four', desc: 'Description for item four', color: 'bg-neutral-500' },
            { title: 'Item Five', desc: 'Description for item five', color: 'bg-neutral-800' },
          ].map((item) => (
            <div key={item.title} className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3.5">
                <span className={`w-[42px] h-[42px] rounded-2xl grid place-items-center text-white font-semibold ${item.color}`}>
                  {item.title.charAt(0)}
                </span>
                <div className="flex flex-col gap-1">
                  <span className="text-[0.95rem] font-semibold text-black">
                    {item.title}
                  </span>
                  <span className="text-[0.8rem] text-neutral-500">{item.desc}</span>
                </div>
              </div>
              <span className="text-neutral-400">›</span>
            </div>
          ))}
        </section>

        <section className="bg-white p-6 rounded-[18px] border border-neutral-300">
          <h3 className="m-0 mb-3 text-[1.1rem] text-black">
            Scrollable Content
          </h3>
          <p className="m-0 mb-4 text-neutral-600 leading-relaxed">
            The device content area is scrollable, so you can add as much content as you
            need. Try scrolling inside the device frame to see more content.
          </p>
          <div className="flex flex-col gap-3">
            {Array.from({ length: 5 }, (_, i) => (
              <div
                key={i}
                className="p-4 bg-neutral-100 rounded-xl text-black border border-neutral-200"
              >
                Card {i + 1} - Add your custom components here
              </div>
            ))}
          </div>
        </section>
      </div>
    </DevicePreview>
  )
}

