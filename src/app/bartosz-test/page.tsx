'use client'

/**
 * BARTOSZ CSS FOUNDATION TEST PAGE
 *
 * This page demonstrates all the new CSS foundation elements:
 * - Fluid typography (clamp)
 * - Dark color palette
 * - Layout system
 * - Component utilities
 * - Glass effects
 * - Grid layouts
 */

export default function BartoszTestPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section - Full Viewport */}
      <section className="museum-section gradient-dark">
        <div className="container-lg text-center space-y-6">
          <p className="label text-accent">
            Design System Test
          </p>
          <h1 className="h1 mb-lg">
            Bartosz Kolenda
            <br />
            <span className="text-gold">CSS Foundation</span>
          </h1>
          <p className="lead max-w-2xl mx-auto mb-xl">
            A complete design system with fluid typography, dark palette, and museum-quality components.
          </p>

          {/* Buttons */}
          <div className="flex gap-md justify-center flex-wrap">
            <button className="btn btn-primary">
              Primary Button
            </button>
            <button className="btn btn-outline">
              Outline Button
            </button>
            <button className="btn btn-ghost">
              Ghost Button
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="scroll-indicator absolute bottom-8">
          <div className="label mb-sm">
            Scroll Down
          </div>
          <div className="scroll-line"></div>
        </div>
      </section>

      {/* Typography Showcase */}
      <section className="section gradient-forest">
        <div className="container-xl">
          <div className="text-center mb-4xl">
            <p className="label text-accent mb-md">
              Fluid Typography
            </p>
            <h2 className="h2 mb-lg">
              Responsive Type System
            </h2>
            <p className="text-secondary max-w-2xl mx-auto">
              All typography scales fluidly from mobile to desktop using clamp() without breakpoints.
            </p>
          </div>

          {/* Typography Examples */}
          <div className="space-y-3xl">
            {/* Headings */}
            <div className="card-glass p-xl">
              <h1 className="h1 mb-md">Heading 1 - clamp(40px → 72px)</h1>
              <h2 className="h2 mb-md">Heading 2 - clamp(32px → 56px)</h2>
              <h3 className="h3 mb-md">Heading 3 - clamp(28px → 48px)</h3>
              <h4 className="h4 mb-md">Heading 4 - clamp(24px → 40px)</h4>
              <h5 className="h5 mb-md">Heading 5 - clamp(20px → 32px)</h5>
              <h6 className="h6">Heading 6 - Uppercase Label</h6>
            </div>

            {/* Body Text */}
            <div className="card-glass p-xl">
              <p className="lead mb-lg">
                Lead paragraph - Slightly larger for introductions and important content.
              </p>
              <p className="mb-md">
                Regular paragraph - Perfect for body content with comfortable line height and letter spacing.
                Scales from 16px on mobile to 20px on desktop for optimal readability.
              </p>
              <p className="small mb-md text-secondary">
                Small text - For captions, labels, and secondary information.
              </p>
              <p className="xs text-tertiary">
                Extra small - For metadata and fine print.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Color Palette */}
      <section className="section">
        <div className="container-xl">
          <div className="text-center mb-4xl">
            <p className="label text-accent mb-md">
              Dark Palette
            </p>
            <h2 className="h2 mb-lg">
              Bartosz Color System
            </h2>
          </div>

          {/* Color Swatches */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-lg">
            {[
              { name: 'BlackGreen', color: 'var(--color-black-green)', desc: 'Main background' },
              { name: 'Dark Green', color: 'var(--color-dark-green)', desc: 'Surface panels' },
              { name: 'Deep Forest', color: 'var(--color-deep-forest)', desc: 'Darkest BG' },
              { name: 'Creme', color: 'var(--color-text-primary)', desc: 'Primary text' },
              { name: 'Accent Gold', color: 'var(--color-accent-gold)', desc: 'Highlights' },
              { name: 'Sage Accent', color: 'var(--color-accent-sage)', desc: 'Secondary' },
            ].map((color) => (
              <div key={color.name} className="card p-lg">
                <div
                  className="w-full h-24 rounded-lg mb-md"
                  style={{ backgroundColor: color.color }}
                />
                <h6 className="h6 mb-xs">{color.name}</h6>
                <p className="xs text-secondary">{color.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Component Library */}
      <section className="section gradient-dark">
        <div className="container-xl">
          <div className="text-center mb-4xl">
            <p className="label text-accent mb-md">
              Components
            </p>
            <h2 className="h2 mb-lg">
              Reusable Patterns
            </h2>
          </div>

          <div className="grid gap-2xl">
            {/* Cards */}
            <div>
              <h3 className="h3 mb-xl">Cards</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-lg">
                <div className="card hover-lift">
                  <h4 className="h4 mb-md">Standard Card</h4>
                  <p className="text-secondary">
                    Dark background with subtle border and lift effect on hover.
                  </p>
                </div>
                <div className="card-glass hover-scale">
                  <h4 className="h4 mb-md">Glass Card</h4>
                  <p className="text-secondary">
                    Glassmorphism with backdrop blur and scale effect.
                  </p>
                </div>
                <div className="card hover-glow glow-gold">
                  <h4 className="h4 mb-md">Glow Card</h4>
                  <p className="text-secondary">
                    Gold glow effect perfect for featured content.
                  </p>
                </div>
              </div>
            </div>

            {/* Badges */}
            <div>
              <h3 className="h3 mb-xl">Badges & Labels</h3>
              <div className="flex gap-md flex-wrap">
                <span className="badge">Default Badge</span>
                <span className="badge-gold">Gold Badge</span>
                <span className="badge-glass">Glass Badge</span>
                <span className="label">UPPERCASE LABEL</span>
              </div>
            </div>

            {/* Buttons */}
            <div>
              <h3 className="h3 mb-xl">Buttons</h3>
              <div className="flex gap-md flex-wrap">
                <button className="btn btn-primary">Primary</button>
                <button className="btn btn-outline">Outline</button>
                <button className="btn btn-ghost">Ghost</button>
              </div>
            </div>

            {/* Dividers */}
            <div>
              <h3 className="h3 mb-xl">Dividers</h3>
              <div className="divider"></div>
              <p className="text-center text-secondary small">Horizontal gradient divider</p>
            </div>
          </div>
        </div>
      </section>

      {/* Layout System */}
      <section className="section gradient-forest">
        <div className="container-xl">
          <div className="text-center mb-4xl">
            <p className="label text-accent mb-md">
              Layout System
            </p>
            <h2 className="h2 mb-lg">
              Grid & Containers
            </h2>
          </div>

          {/* Grid Examples */}
          <div className="space-y-3xl">
            {/* 2 Column */}
            <div>
              <h3 className="h3 mb-xl">Two Column Grid</h3>
              <div className="two-column">
                <div className="card p-xl">
                  <h4 className="h4 mb-md">Column 1</h4>
                  <p className="text-secondary">Responsive 2-column layout</p>
                </div>
                <div className="card p-xl">
                  <h4 className="h4 mb-md">Column 2</h4>
                  <p className="text-secondary">Stacks on mobile</p>
                </div>
              </div>
            </div>

            {/* Pedestal Grid */}
            <div>
              <h3 className="h3 mb-xl">Book Pedestal Grid</h3>
              <div className="pedestal-grid">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="card p-xl text-center hover-lift">
                    <div className="w-full h-64 bg-[var(--color-dark-green)] rounded-lg mb-md flex items-center justify-center">
                      <span className="h1 text-gold">{i}</span>
                    </div>
                    <h4 className="h4 mb-sm">Book Title {i}</h4>
                    <p className="small text-secondary">Museum-style display grid</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Effects Showcase */}
      <section className="section">
        <div className="container-xl">
          <div className="text-center mb-4xl">
            <p className="label text-accent mb-md">
              Special Effects
            </p>
            <h2 className="h2 mb-lg">
              Backdrop Blur & Glow
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-2xl">
            {/* Glass Effect */}
            <div className="relative h-96 rounded-2xl overflow-hidden">
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(135deg, var(--color-accent-gold), var(--color-accent-sage))'
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="glass p-xl max-w-md">
                  <h3 className="h3 mb-md">Glassmorphism</h3>
                  <p className="text-secondary">
                    Backdrop blur creates depth and sophistication
                  </p>
                </div>
              </div>
            </div>

            {/* Glow Effect */}
            <div className="relative h-96 rounded-2xl overflow-hidden bg-[var(--color-deep-forest)] flex items-center justify-center">
              <div className="glow-gold-intense p-xl max-w-md text-center">
                <h3 className="h3 mb-md text-gold">Gold Glow</h3>
                <p className="text-secondary">
                  Multi-layered shadow for museum lighting effect
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="section gradient-dark text-center">
        <div className="container-lg">
          <h2 className="h2 mb-lg">
            Ready to Build?
          </h2>
          <p className="lead mb-xl max-w-2xl mx-auto">
            All CSS foundation files are in <code>src/styles/</code> ready for Phase 2.
          </p>
          <button className="btn btn-primary">
            Continue to Navigation Phase →
          </button>
        </div>
      </section>
    </div>
  )
}
