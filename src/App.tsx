import { useEffect, useRef, useState } from 'react'

// ─── Data Types ───────────────────────────────────────────────────────────────
export interface PastEvent {
  id: string
  num: string
  title: string
  tag: string
  date: string
  shortDesc: string
  successStory: string
  photos: [string, string]
  photoCaptions: [string, string]
}

export interface UpcomingEvent {
  id: string
  num: string
  title: string
  subtitle: string
  date: string
  tag: string
  desc: string
  isFlagship?: boolean
}

// ─── Past Events Data (from Official Presentation Archive) ─────────────────────
const PAST_EVENTS: PastEvent[] = [
  {
    id: 'vriksha-sanjivani',
    num: '01 / 10',
    title: 'VRIKSHA SANJIVANI',
    tag: 'Tree Revival & Distribution',
    date: 'August 2025',
    shortDesc: 'A massive tree revival, botanical care, and sapling adoption drive across campus perimeters and local ecosystems.',
    successStory: 'Restored and distributed over 500 indigenous saplings with organic soil conditioning and student adoption pledges.',
    photos: [
      '/club-assets/vriksha-1.png',
      '/club-assets/vriksha-2.png',
    ],
    photoCaptions: ['Live sapling distribution & blessing ceremony', 'Student mass plantation drive on campus'],
  },
  {
    id: 'swachh-sankalp',
    num: '02 / 10',
    title: 'SWACHH SANKALP',
    tag: 'Cleanliness & Green Canopy',
    date: 'October 2025',
    shortDesc: 'Comprehensive clean campus and plantation initiative uniting students for zero-waste ecosystems and greener surroundings.',
    successStory: 'Over 850 saplings planted while clearing single-use plastics and establishing dedicated composting zones.',
    photos: [
      '/club-assets/swachh-1.png',
      '/club-assets/swachh-2.png',
    ],
    photoCaptions: ['Swachh Sankalp campus pledge ceremony', 'Student community planting indigenous trees'],
  },
  {
    id: 'yogathon',
    num: '03 / 10',
    title: 'YOGATHON',
    tag: 'Health & Nature Harmony',
    date: 'December 2025',
    shortDesc: 'Spreading the vitality of yoga and mindful wellness amidst open-air natural campus greens at sunrise.',
    successStory: '350+ students, faculty, and nature enthusiasts gathered at dawn for 108 Surya Namaskars and deep breathing.',
    photos: [
      '/club-assets/yogathon-1.png',
      '/club-assets/yogathon-2.png',
    ],
    photoCaptions: ['Sunrise open-air Yogathon assembly', 'Faculty & student yoga wellness practice'],
  },
  {
    id: 'vasundhara',
    num: '04 / 10',
    title: 'VASUNDHARA',
    tag: 'Earth Cultural Feast',
    date: 'February 2026',
    shortDesc: 'Annual flagship symposium celebrating planetary heritage, eco-art exhibitions, and student environmental pledges.',
    successStory: 'Curated a living biodiversity gallery with rare botanical specimens and zero-waste craft installations.',
    photos: [
      '/club-assets/vasundhara-1.jpg',
      '/club-assets/vasundhara-2.jpg',
    ],
    photoCaptions: ['Vasundhara inaugural ceremony & exhibition', 'Student botanical art & planetary heritage'],
  },
  {
    id: 'ecothon-5',
    num: '05 / 10',
    title: 'ECOTHON 5.O',
    tag: 'National Innovation Hackathon',
    date: 'April 2026',
    shortDesc: 'High-energy 36-hour national hackathon engineering smart technical solutions for climate, solar, and waste challenges.',
    successStory: '60+ inter-college teams built working IoT water-monitoring sensors, solar tracking rigs, and circular economy models.',
    photos: [
      '/club-assets/ecothon-1.jpg',
      '/club-assets/ecothon-2.jpg',
    ],
    photoCaptions: ['Ecothon project demonstration & judging', 'Hackathon hardware & IoT sensor prototypes'],
  },
]

// ─── Upcoming Events Data (from Official Presentation Archive) ─────────────────
const UPCOMING_EVENTS: UpcomingEvent[] = [
  {
    id: 'up-vasundhara',
    num: '06 / 10',
    title: 'VASUNDHARA: The Cultural Feast',
    subtitle: 'Inter-College Eco-Drama, Poetry & Art Carnival',
    date: 'October 2026',
    tag: 'Planetary Cultural Fest',
    desc: 'A grand celebration uniting students in eco-theatre, environmental music, sustainable art showcases, and green pledges.',
  },
  {
    id: 'up-swachh-sankalp',
    num: '07 / 10',
    title: 'SWACHH SANKALP: Cleanliness & Environmental Awareness',
    subtitle: 'Campus-wide Zero Waste Drive & Awareness Rally',
    date: 'November 2026',
    tag: 'Environmental Action',
    desc: 'Mobilizing youth for zero-waste segregation, organic composting workshops, and community environmental awareness.',
  },
  {
    id: 'up-trekking',
    num: '08 / 10',
    title: 'TREKKING: Connecting with Nature',
    subtitle: 'Melghat Tiger Reserve Wilderness Trail',
    date: 'December 2026',
    tag: 'Eco Trek & Camp',
    desc: 'Guided wilderness expedition through pristine forest corridors to study local biodiversity, flora, and bird species.',
  },
  {
    id: 'up-yogathon',
    num: '09 / 10',
    title: 'YOGATHON: Spreading The Importance of Yoga',
    subtitle: 'Mindfulness & Physical Vitality Marathon',
    date: 'January 2027',
    tag: 'Holistic Wellness',
    desc: 'Campus-wide morning yoga marathon uniting engineering departments in physical health, mindfulness, and eco-consciousness.',
  },
  {
    id: 'up-ecothon-6',
    num: '10 / 10',
    title: 'THE ECOTHON 6.0: The National Level HACKATHON of Sipna',
    subtitle: 'The Biggest Hackathon of Sipna College',
    date: 'March 2027',
    tag: '⭐ THE BIGGEST HACKATHON OF SIPNA COLLEGE',
    desc: 'Flagship 48-hour national innovation hackathon with nationwide collegiate teams solving urgent environmental, EV, renewable energy, and circular economy challenges.',
    isFlagship: true,
  },
]

// ─── Component: Navbar ────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id: string) => {
    setMobileOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <header className={`site-nav${scrolled ? ' site-nav--scrolled' : ''}`}>
        <div className="site-nav__inner">
          <a
            href="#"
            className="site-nav__brand"
            onClick={(e) => {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
          >
            <img
              src="/club-assets/logo.png"
              alt="Nature Club Logo"
              className="site-nav__logo-img"
              width="36"
              height="36"
            />
            <span className="site-nav__brand-title">Natures Club</span>
          </a>

          <nav className="site-nav__menu">
            <a href="#journey" className="site-nav__link" onClick={(e) => { e.preventDefault(); scrollTo('journey') }}>THE JOURNEY</a>
            <a href="#what-next" className="site-nav__link" onClick={(e) => { e.preventDefault(); scrollTo('what-next') }}>WHAT NEXT</a>
            <a href="#people" className="site-nav__link" onClick={(e) => { e.preventDefault(); scrollTo('people') }}>THE PEOPLE</a>
            <a href="#join" className="site-nav__link site-nav__link--cta" onClick={(e) => { e.preventDefault(); scrollTo('join') }}>
              JOIN THE CLUB <span className="arrow-icon">↗</span>
            </a>
          </nav>

          <button
            className={`site-nav__toggle${mobileOpen ? ' is-active' : ''}`}
            aria-label="Toggle navigation"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <span /><span /><span />
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div className={`mobile-drawer${mobileOpen ? ' is-open' : ''}`}>
        <div className="mobile-drawer__links">
          <a href="#journey" className="mobile-drawer__link" onClick={(e) => { e.preventDefault(); scrollTo('journey') }}>THE JOURNEY</a>
          <a href="#what-next" className="mobile-drawer__link" onClick={(e) => { e.preventDefault(); scrollTo('what-next') }}>WHAT NEXT</a>
          <a href="#people" className="mobile-drawer__link" onClick={(e) => { e.preventDefault(); scrollTo('people') }}>THE PEOPLE</a>
          <a href="#join" className="mobile-drawer__link mobile-drawer__link--highlight" onClick={(e) => { e.preventDefault(); scrollTo('join') }}>
            JOIN THE CLUB ↗
          </a>
        </div>
      </div>
    </>
  )
}

// ─── Component: Hero ──────────────────────────────────────────────────────────
function Hero() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="hero-ref" id="home">
      {/* Background Forest Image with Dark Vignette */}
      <div className="hero-ref__bg" />
      <div className="hero-ref__glow" />

      {/* Top Right SCOET Institution Badge */}
      <div className="hero-ref__institution">
        <div className="hero-ref__institution-tag">SCOET / AMRAVATI</div>
        <div className="hero-ref__institution-name">Sipna College of Engineering &amp; Technology</div>
      </div>

      <div className="container hero-ref__container">
        <div className="hero-ref__content">
          {/* Eyebrow / Pill */}
          <div className="hero-ref__eyebrow">
            <span className="hero-ref__eyebrow-line" />
            <span>STUDENT-LED ENVIRONMENTAL ACTION</span>
          </div>

          {/* Massive Display Heading */}
          <h1 className="hero-ref__title">
            <span className="hero-ref__title-sans">Welcome to</span>
            <span className="hero-ref__title-serif">Natures<span className="hero-ref__title-sans">Club.</span></span>
          </h1>

          {/* Subtext */}
          <p className="hero-ref__subtext">
            A living community at Sipna, cultivating curiosity, responsibility,
            and a greener tomorrow — one thoughtful action at a time.
          </p>

          {/* Interactive Actions */}
          <div className="hero-ref__actions">
            <button
              className="btn-pill btn-pill--primary"
              id="hero-explore-btn"
              onClick={() => scrollTo('journey')}
            >
              Explore our journey ↓
            </button>
            <button
              className="btn-pill btn-pill--ghost"
              id="hero-people-btn"
              onClick={() => scrollTo('people')}
            >
              Meet the people ↗
            </button>
          </div>
        </div>

        {/* Bottom Hero Stats & Tickers */}
        <div className="hero-ref__footer">
          <div className="hero-ref__stats">
            <div className="hero-ref__stat">
              <span className="hero-ref__stat-num">10</span>
              <span className="hero-ref__stat-label">MOMENTS<br />IN MOTION</span>
            </div>
            <div className="hero-ref__stat">
              <span className="hero-ref__stat-num">01</span>
              <span className="hero-ref__stat-label">STUDENT<br />COMMUNITY</span>
            </div>
          </div>

          <div className="hero-ref__footer-caption">
            ROOTED IN CAMPUS, REACHING FURTHER
          </div>
        </div>
      </div>

      {/* Vertical Scroll Indicator */}
      <div className="hero-ref__scroll-indicator">
        <div className="hero-ref__scroll-num">01</div>
        <div className="hero-ref__scroll-line" />
        <div className="hero-ref__scroll-text">SCROLL TO WANDER</div>
      </div>
    </section>
  )
}

// ─── Component: Archive / Field Note Modal Popup ──────────────────────────────
interface EventModalProps {
  event: PastEvent | null
  onClose: () => void
}

function EventModal({ event, onClose }: EventModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  if (!event) return null

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="field-note-card" onClick={(e) => e.stopPropagation()}>
        {/* Card Header */}
        <div className="field-note-card__header">
          <div className="field-note-card__eyebrow">
            ARCHIVE / FIELD NOTE
          </div>
          <button className="field-note-card__close" onClick={onClose} aria-label="Close field note">
            ✕
          </button>
        </div>

        {/* Main Body Grid */}
        <div className="field-note-card__body">
          {/* Left Column: Narrative */}
          <div className="field-note-card__narrative">
            <div className="field-note-card__index-pill">
              <span className="leaf-icon">🍃</span> {event.num}
            </div>

            <h2 className="field-note-card__title">{event.title}</h2>

            <p className="field-note-card__desc">{event.shortDesc}</p>

            <div className="field-note-card__story-box">
              <div className="field-note-card__story-label">THE SUCCESS STORY</div>
              <p className="field-note-card__story-text">{event.successStory}</p>
            </div>

            <div className="field-note-card__status-box">
              <div className="field-note-card__status-line" />
              <div>
                <div className="field-note-card__status-label">ARCHIVE STATUS</div>
                <div className="field-note-card__status-title">Two image story</div>
                <div className="field-note-card__status-desc">
                  Curated photographic records from the SCOET Natures Club live field logs.
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Two Photographs */}
          <div className="field-note-card__gallery">
            {event.photos.map((photo, i) => (
              <div className="field-note-card__photo-frame" key={i}>
                <img
                  src={photo}
                  alt={`${event.title} documentary snapshot ${i + 1}`}
                  className="field-note-card__photo"
                  loading="lazy"
                />
                <div className="field-note-card__photo-label">
                  <span>PHOTO {i + 1}</span>
                  <span className="caption-text">{event.photoCaptions[i]}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Card Footer Footnote */}
        <div className="field-note-card__footer">
          <span>The club archive is growing — every field note captures our hands-on student environmental action.</span>
          <button className="btn-pill btn-pill--dark" onClick={onClose}>
            Close note
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── S-Curve Path (shared) ─────────────────────────────────────────────────────
// Desktop: full S-sweep. Milestone Y-positions (in 0–1000 viewBox units):
// Node 0 → y≈100, Node 1 → y≈300, Node 2 → y≈500, Node 3 → y≈700, Node 4 → y≈900
const S_PATH_D = "M 200 0 C 310 40, 290 70, 200 100 C 60 160, 60 240, 200 300 C 340 360, 340 440, 200 500 C 60 560, 60 640, 200 700 C 340 760, 340 840, 200 900 C 200 950, 200 980, 200 1000"
// Approximate fractional positions of each node along the total path length
const NODE_FRACTIONS = [0.1, 0.3, 0.5, 0.7, 0.9]

// ─── Component: Scroll-Driven Draw-On S-Curve ──────────────────────────────────
interface ScrollSCurveProps {
  isFuture?: boolean
  nodeCount: number
  sectionRef: React.RefObject<HTMLElement | null>
  onNodeLit: (index: number) => void
}

function ScrollSCurve({ isFuture = false, nodeCount, sectionRef, onNodeLit }: ScrollSCurveProps) {
  const pathRef = useRef<SVGPathElement>(null)
  const glowPathRef = useRef<SVGPathElement>(null)
  const litRef = useRef<boolean[]>(Array(nodeCount).fill(false))
  const targetProgressRef = useRef<number>(0)
  const currentProgressRef = useRef<number>(0)

  const gradientId = isFuture ? 'sCurveGradFuture' : 'sCurveGradPast'
  const glowFilterId = isFuture ? 'sCurveGlowFilterFuture' : 'sCurveGlowFilterPast'

  useEffect(() => {
    litRef.current = Array(nodeCount).fill(false)
  }, [nodeCount])

  useEffect(() => {
    const path = pathRef.current
    if (!path) return

    const totalLen = path.getTotalLength()
    path.style.strokeDasharray = `${totalLen}`
    path.style.strokeDashoffset = `${totalLen}`
    if (glowPathRef.current) {
      glowPathRef.current.style.strokeDasharray = `${totalLen}`
      glowPathRef.current.style.strokeDashoffset = `${totalLen}`
    }

    let active = true

    const calculateTarget = () => {
      const section = sectionRef.current
      if (!section) return
      const rect = section.getBoundingClientRect()
      const vh = window.innerHeight
      // Smooth start when section enters viewport, finish when passing bottom
      const start = rect.top - vh * 0.85
      const end = rect.bottom - vh * 0.3
      const range = Math.max(end - start, 1)
      const scrolled = -start
      const raw = Math.min(Math.max(scrolled / range, 0), 1)
      targetProgressRef.current = raw
    }

    const animate = () => {
      if (!active) return
      calculateTarget()

      // Silk-smooth physics lerp interpolation
      const diff = targetProgressRef.current - currentProgressRef.current
      if (Math.abs(diff) > 0.0001) {
        currentProgressRef.current += diff * 0.1
      } else {
        currentProgressRef.current = targetProgressRef.current
      }

      const cur = currentProgressRef.current
      const offset = totalLen * (1 - cur)
      path.style.strokeDashoffset = `${offset}`
      if (glowPathRef.current) {
        glowPathRef.current.style.strokeDashoffset = `${offset}`
      }

      // Light up nodes based on smoothed progress
      NODE_FRACTIONS.slice(0, nodeCount).forEach((frac, i) => {
        if (!litRef.current[i] && cur >= frac - 0.02) {
          litRef.current[i] = true
          onNodeLit(i)
        }
      })

      requestAnimationFrame(animate)
    }

    const animationId = requestAnimationFrame(animate)

    return () => {
      active = false
      cancelAnimationFrame(animationId)
    }
  }, [sectionRef, nodeCount, onNodeLit])

  return (
    <div className="scurve-svg-wrap" aria-hidden="true">
      <svg
        className="scurve-svg"
        viewBox="0 0 400 1000"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
            {isFuture ? (
              <>
                <stop offset="0%" stopColor="#a3e635" stopOpacity="0.6" />
                <stop offset="40%" stopColor="#f4c842" stopOpacity="1" />
                <stop offset="70%" stopColor="#f39c12" stopOpacity="1" />
                <stop offset="100%" stopColor="#e67e22" stopOpacity="0.7" />
              </>
            ) : (
              <>
                <stop offset="0%" stopColor="#a3e635" stopOpacity="0.7" />
                <stop offset="40%" stopColor="#2ecc71" stopOpacity="1" />
                <stop offset="70%" stopColor="#27ae60" stopOpacity="1" />
                <stop offset="100%" stopColor="#1e824c" stopOpacity="0.6" />
              </>
            )}
          </linearGradient>

          <filter id={glowFilterId} x="-30%" y="-5%" width="160%" height="110%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Ghost track — always visible, faint */}
        <path
          d={S_PATH_D}
          stroke={isFuture ? 'rgba(244,200,66,0.08)' : 'rgba(46,204,113,0.08)'}
          strokeWidth="14"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Glow halo — animated draw-on */}
        <path
          ref={glowPathRef}
          d={S_PATH_D}
          stroke={isFuture ? 'rgba(244,200,66,0.28)' : 'rgba(46,204,113,0.28)'}
          strokeWidth="12"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ willChange: 'stroke-dashoffset' }}
        />

        {/* Main draw-on path */}
        <path
          ref={pathRef}
          d={S_PATH_D}
          stroke={`url(#${gradientId})`}
          strokeWidth="3.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter={`url(#${glowFilterId})`}
          style={{ willChange: 'stroke-dashoffset' }}
        />
      </svg>
    </div>
  )
}

// ─── Component: The Journey (Past Events S-Curve Timeline) ─────────────────────
function JourneySection({ onSelectEvent }: { onSelectEvent: (event: PastEvent) => void }) {
  const sectionRef = useRef<HTMLElement>(null)
  const [litNodes, setLitNodes] = useState<boolean[]>(Array(PAST_EVENTS.length).fill(false))

  const handleNodeLit = (index: number) => {
    setLitNodes(prev => {
      const next = [...prev]
      next[index] = true
      return next
    })
  }

  return (
    <section className="section-s timeline-section" id="journey" ref={sectionRef}>
      <div className="section-watermark-logo" aria-hidden="true" />
      <div className="container">
        {/* Section Header */}
        <div className="section-header-grid">
          <div className="section-header-left">
            <div className="timeline-eyebrow">01 / THE ARCHIVE</div>
            <h2 className="section-hero-title">
              The <span className="title-serif-italic">journey</span> so far.
            </h2>
          </div>
          <div className="section-header-right">
            <p className="section-hero-desc">
              Every event is a small act of care. Together, they become a campus culture that notices, nurtures, and makes room for the wild.
            </p>
            <div className="section-scroll-cta">↓ FOLLOW THE CURVE</div>
          </div>
        </div>

        {/* S-Curve Timeline Container */}
        <div className="scurve-timeline">
          {/* Scroll-Driven Draw-On SVG Path */}
          <ScrollSCurve
            isFuture={false}
            nodeCount={PAST_EVENTS.length}
            sectionRef={sectionRef}
            onNodeLit={handleNodeLit}
          />

          <div className="scurve-timeline__items">
            {PAST_EVENTS.map((event, idx) => {
              const isEven = idx % 2 === 1
              const isLit = litNodes[idx]
              return (
                <div
                  key={event.id}
                  className={`scurve-item ${isEven ? 'scurve-item--reverse' : ''}`}
                >
                  {/* Left (or Right) Title & Date Side */}
                  <div className={`scurve-item__title-col ${isLit ? 'scurve-item__title-col--lit' : ''}`}>
                    <div className="scurve-item__num">{event.num}</div>
                    <h3 className="scurve-item__heading">{event.title}</h3>
                    <div className="scurve-item__tag-pill">{event.tag}</div>
                    <div className="scurve-item__date">{event.date}</div>
                  </div>

                  {/* Central Node on the S-Curve */}
                  <div
                    className={`scurve-item__node ${isLit ? 'scurve-item__node--lit' : ''}`}
                    onClick={() => onSelectEvent(event)}
                    role="button"
                    tabIndex={0}
                    aria-label={`Open field note for ${event.title}`}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onSelectEvent(event) }}
                  >
                    <div className="scurve-item__node-pulse" />
                    <div className="scurve-item__node-dot">🌿</div>
                  </div>

                  {/* Opposite Interactive Card Side */}
                  <div className={`scurve-item__card-col ${isLit ? 'scurve-item__card-col--lit' : ''}`}>
                    <div
                      className="glass-card scurve-item__card"
                      onClick={() => onSelectEvent(event)}
                      role="button"
                      tabIndex={0}
                      aria-label={`View summary and photographs for ${event.title}`}
                      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onSelectEvent(event) }}
                    >
                      <div className="glass-card__badge">ARCHIVE NOTE</div>
                      <p className="glass-card__desc">{event.shortDesc}</p>
                      <div className="glass-card__story-preview">
                        <strong>Impact:</strong> {event.successStory}
                      </div>

                      {/* Photo Thumbnail Previews */}
                      <div className="glass-card__thumbs">
                        <img src={event.photos[0]} alt="Snapshot 1" loading="lazy" />
                        <img src={event.photos[1]} alt="Snapshot 2" loading="lazy" />
                        <div className="glass-card__thumbs-cta">
                          <span>View 2 Photos &amp; Story ↗</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Component: What Next (Upcoming Events S-Curve Roadmap) ───────────────────
function WhatNextSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [litNodes, setLitNodes] = useState<boolean[]>(Array(UPCOMING_EVENTS.length).fill(false))

  const handleNodeLit = (index: number) => {
    setLitNodes(prev => {
      const next = [...prev]
      next[index] = true
      return next
    })
  }

  return (
    <section className="section-s what-next-section" id="what-next" ref={sectionRef}>
      <div className="section-watermark-logo section-watermark-logo--gold" aria-hidden="true" />
      <div className="container">
        {/* Section Header */}
        <div className="section-header-grid">
          <div className="section-header-left">
            <div className="timeline-eyebrow timeline-eyebrow--lime">02 / THE HORIZON</div>
            <h2 className="section-hero-title">
              What <span className="title-serif-italic">next?</span>
            </h2>
          </div>
          <div className="section-header-right">
            <p className="section-hero-desc">
              The next chapter is not waiting to be written. It is already taking shape in the hands, ideas, and energy of our students.
            </p>
            <div className="section-scroll-cta">The future is local</div>
          </div>
        </div>

        {/* Roadmap Items */}
        <div className="scurve-timeline">
          {/* Scroll-Driven Draw-On SVG Path */}
          <ScrollSCurve
            isFuture={true}
            nodeCount={UPCOMING_EVENTS.length}
            sectionRef={sectionRef}
            onNodeLit={handleNodeLit}
          />

          <div className="scurve-timeline__items">
            {UPCOMING_EVENTS.map((event, idx) => {
              const isEven = idx % 2 === 1
              const isLit = litNodes[idx]
              return (
                <div
                  key={event.id}
                  className={`scurve-item ${isEven ? 'scurve-item--reverse' : ''} ${event.isFlagship ? 'scurve-item--flagship' : ''}`}
                >
                  {/* Title Side */}
                  <div className={`scurve-item__title-col ${isLit ? 'scurve-item__title-col--lit' : ''}`}>
                    <div className="scurve-item__num scurve-item__num--gold">{event.num}</div>
                    <h3 className={`scurve-item__heading ${event.isFlagship ? 'scurve-item__heading--flagship' : ''}`}>
                      {event.title}
                    </h3>
                    <div className={`scurve-item__tag-pill ${event.isFlagship ? 'tag-flagship' : ''}`}>
                      {event.tag}
                    </div>
                    <div className="scurve-item__date scurve-item__date--gold">
                      🗓️ {event.date}
                    </div>
                  </div>

                  {/* Central Node */}
                  <div className={`scurve-item__node scurve-item__node--future ${isLit ? 'scurve-item__node--lit scurve-item__node--lit-gold' : ''}`}>
                    <div className={`scurve-item__node-pulse ${event.isFlagship ? 'pulse-flagship' : ''}`} />
                    <div className="scurve-item__node-dot">
                      {event.isFlagship ? '⚡' : '🌱'}
                    </div>
                  </div>

                  {/* Description Card Side */}
                  <div className={`scurve-item__card-col ${isLit ? 'scurve-item__card-col--lit' : ''}`}>
                    <div className={`glass-card scurve-item__card ${event.isFlagship ? 'glass-card--flagship' : ''}`}>
                      {event.isFlagship && (
                        <div className="flagship-badge">
                          🔥 THE BIGGEST HACKATHON OF SIPNA COLLEGE
                        </div>
                      )}
                      <h4 className="glass-card__subtitle">{event.subtitle}</h4>
                      <p className="glass-card__desc">{event.desc}</p>

                      <div className="glass-card__action-row">
                        <a
                          href="#join"
                          className={`btn-pill btn-pill--sm ${event.isFlagship ? 'btn-pill--gold' : 'btn-pill--primary'}`}
                          onClick={(e) => {
                            e.preventDefault()
                            document.getElementById('join')?.scrollIntoView({ behavior: 'smooth' })
                          }}
                        >
                          {event.isFlagship ? 'Register for Ecothon 6.0 ⚡' : 'Notify Me Upon Opening 🔔'}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Component: Leadership & Team Bento ───────────────────────────────────────
function LeadershipSection() {
  return (
    <section className="section-s people-section" id="people">
      <div className="section-watermark-logo" aria-hidden="true" />
      <div className="container">
        <div className="section-header-grid">
          <div className="section-header-left">
            <div className="timeline-eyebrow">03 / THE PEOPLE</div>
            <h2 className="section-hero-title">
              Many hands. <br /><span className="title-serif-italic">One canopy.</span>
            </h2>
          </div>
          <div className="section-header-right">
            <p className="section-hero-desc">
              Guided by mentors, carried by students, and made possible by a shared belief that change grows better together.
            </p>
          </div>
        </div>

        {/* Administration Tier */}
        <div className="bento-section">
          <h3 className="bento-tier-title">🏛️ Institution &amp; Faculty Administration</h3>
          <div className="bento-grid bento-grid--admin">
            <div className="bento-card bento-card--admin">
              <div className="bento-card__avatar-badge">Dean</div>
              <div className="bento-card__role">Dean - Student Affairs</div>
              <h4 className="bento-card__name">Dr. P. R. Malasane</h4>
              <p className="bento-card__desc">Sipna College of Engineering &amp; Technology, Amravati</p>
            </div>

            <div className="bento-card bento-card--admin">
              <div className="bento-card__avatar-badge">Advisor</div>
              <div className="bento-card__role">Faculty Advisor</div>
              <h4 className="bento-card__name">Prof.Sanjivani Harne</h4>
              <p className="bento-card__desc">Department of Applied Sciences &amp; Environmental Studies</p>
            </div>

            <div className="bento-card bento-card--admin">
              <div className="bento-card__avatar-badge">Incharge</div>
              <div className="bento-card__role">Club Incharge</div>
              <h4 className="bento-card__name">Prof. Sanjivani Harne</h4>
              <p className="bento-card__desc">Nature Club Incharge, SCOET</p>
            </div>
          </div>
        </div>

        {/* Core Committee 2025-26 */}
        <div className="bento-section">
          <h3 className="bento-tier-title">🌿 Nature Club Core Committee 2025-26</h3>
          <div className="bento-grid bento-grid--core">
            <div className="bento-card bento-card--lead bento-card--has-avatar">
              <div className="bento-card__avatar-wrap">
                <img src="/club-assets/aditya-rathod.png" alt="Aditya Rathod" className="bento-card__avatar-img" />
              </div>
              <div className="bento-card__info">
                <div className="bento-card__role-tag">President</div>
                <h4 className="bento-card__name">Aditya Rathod</h4>
                <p className="bento-card__desc">Head of Club Strategy &amp; Environmental Outreach</p>
              </div>
            </div>

            <div className="bento-card bento-card--lead bento-card--has-avatar">
              <div className="bento-card__avatar-wrap">
                <img src="/club-assets/krutika-bonde.png" alt="Krutika Bonde" className="bento-card__avatar-img" />
              </div>
              <div className="bento-card__info">
                <div className="bento-card__role-tag">Vice President</div>
                <h4 className="bento-card__name">Krutika Bonde</h4>
                <p className="bento-card__desc">Operations &amp; Student Drive Logistics</p>
              </div>
            </div>

            <div className="bento-card bento-card--lead bento-card--has-avatar">
              <div className="bento-card__avatar-wrap">
                <img src="/club-assets/tanvi-rane.png" alt="Tanvi Rane" className="bento-card__avatar-img" />
              </div>
              <div className="bento-card__info">
                <div className="bento-card__role-tag">Secretary</div>
                <h4 className="bento-card__name">Tanvi Rane</h4>
                <p className="bento-card__desc">Documentation, Liaison &amp; Event Coordination</p>
              </div>
            </div>

            <div className="bento-card bento-card--slot">
              <div className="bento-card__role-tag slot-tag">Treasurer</div>
              <h4 className="bento-card__name">[To be updated]</h4>
              <p className="bento-card__desc">Finance &amp; Resource Allocation</p>
            </div>

            <div className="bento-card bento-card--slot">
              <div className="bento-card__role-tag slot-tag">Chief Executive Head</div>
              <h4 className="bento-card__name">[To be updated]</h4>
              <p className="bento-card__desc">Taskforce &amp; On-ground Execution</p>
            </div>

            <div className="bento-card bento-card--slot">
              <div className="bento-card__role-tag slot-tag">Public Relations Officer (PRO)</div>
              <h4 className="bento-card__name">[To be updated]</h4>
              <p className="bento-card__desc">Media, Design &amp; Digital Communications</p>
            </div>

            <div className="bento-card bento-card--slot bento-card--full-span">
              <div className="bento-card__role-tag slot-tag">Executive Members</div>
              <h4 className="bento-card__name">3 Positions [To be updated]</h4>
              <p className="bento-card__desc">Active Taskforce for Hackathons, Field Treks &amp; Plantation Drives</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Component: Join & Footer with Stylized QR Code ───────────────────────────
function JoinSection() {
  const [copied, setCopied] = useState(false)

  const copyEmail = () => {
    navigator.clipboard.writeText('naturesclub@scoet.ac.in')
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  return (
    <section className="section-s join-section" id="join">
      <div className="container">
        <div className="join-container">
          <div className="join-card">
            {/* Left Content */}
            <div className="join-card__content">
              <div className="join-leaf-badge">🌱</div>
              <div className="timeline-eyebrow timeline-eyebrow--lime">04 / YOUR TURN</div>
              <h2 className="section-hero-title section-hero-title--light">
                Join the green <br /><span className="title-serif-italic title-serif-italic--lime">revolution.</span>
              </h2>
              <p className="join-card__desc">
                Bring your questions, your energy, and your willingness to begin. The next good idea could start with you.
              </p>

              <div className="join-card__actions">
                <a
                  href="#hero"
                  className="btn-pill btn-pill--cream"
                  onClick={(e) => {
                    e.preventDefault()
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }}
                >
                  Back to the beginning ↗
                </a>
                <button className="btn-pill btn-pill--ghost-cream" onClick={copyEmail}>
                  {copied ? '✓ Email Copied!' : 'Copy Contact Email 📋'}
                </button>
              </div>
            </div>

            {/* Right: Stylized Dotted QR Card */}
            <div className="join-card__qr-side">
              <div className="qr-dotted-frame">
                <div className="qr-diamond-icon">🌱</div>
                <div className="qr-reserved-tag">QR / SPACE RESERVED</div>
                <p className="qr-reserved-desc">Official club registration link will live here.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="site-footer">
          <div className="site-footer__top">
            <div className="site-footer__brand">
              <div className="site-footer__logo">🌿 Natures Club · SCOET</div>
              <p className="site-footer__text">
                Sipna College of Engineering and Technology, Infront of Nemani Godown,
                Badnera Road, Amravati, Maharashtra 444701.
              </p>
            </div>

            <div className="site-footer__nav-group">
              <div className="site-footer__nav-title">Quick Links</div>
              <ul className="site-footer__links">
                <li><a href="#home">Welcome</a></li>
                <li><a href="#journey">The Journey (Archive)</a></li>
                <li><a href="#what-next">What Next (Roadmap)</a></li>
                <li><a href="#people">Leadership Team</a></li>
              </ul>
            </div>

            <div className="site-footer__nav-group">
              <div className="site-footer__nav-title">Initiatives</div>
              <ul className="site-footer__links">
                <li><a href="#what-next">Ecothon 6.0 Hackathon</a></li>
                <li><a href="#journey">Vrikshasanjivani</a></li>
                <li><a href="#journey">Vasundhara Earth Fest</a></li>
                <li><a href="#journey">Campus Green Canopy</a></li>
              </ul>
            </div>

            <div className="site-footer__nav-group">
              <div className="site-footer__nav-title">Contact &amp; Affiliation</div>
              <ul className="site-footer__links">
                <li><a href="mailto:naturesclub@scoet.ac.in">naturesclub@scoet.ac.in</a></li>
                <li><a href="https://sipnaengg.ac.in" target="_blank" rel="noreferrer">sipnaengg.ac.in</a></li>
                <li><span>Amravati, Maharashtra, India</span></li>
              </ul>
            </div>
          </div>

          <div className="site-footer__bottom">
            <div>© 2026 Natures Club, Sipna College of Engineering &amp; Technology. All rights reserved.</div>
            <div>Handcrafted with 💚 for Environmental Stewardship &amp; Conservation.</div>
          </div>
        </footer>
      </div>
    </section>
  )
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [selectedEvent, setSelectedEvent] = useState<PastEvent | null>(null)

  return (
    <div className="app-root">
      <Navbar />
      <main>
        <Hero />
        <JourneySection onSelectEvent={setSelectedEvent} />
        <WhatNextSection />
        <LeadershipSection />
        <JoinSection />
      </main>

      {/* Field Note Event Modal */}
      <EventModal
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />
    </div>
  )
}
