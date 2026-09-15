import { useCallback, useEffect, useRef, useState } from 'react'

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
  posterUrl?: string
  posterCaption?: string
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
    successStory: 'Restored and distributed over 80+ indigenous saplings with organic soil conditioning and student adoption pledges.',
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
    shortDesc: 'High-energy 12-hour national hackathon engineering smart technical solutions for climate, solar, and waste challenges.',
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
    num: '06 / 11',
    title: 'VASUNDHARA: The Cultural Feast',
    subtitle: 'Inter-College Eco-Drama, Poetry & Art Carnival',
    date: 'October 2026',
    tag: 'Planetary Cultural Fest',
    desc: 'A grand celebration uniting students in eco-theatre, environmental music, sustainable art showcases, and green pledges.',
  },
  {
    id: 'up-swachh-sankalp',
    num: '07 / 11',
    title: 'SWACHH SANKALP: Cleanliness & Environmental Awareness',
    subtitle: 'Campus-wide Zero Waste Drive & Awareness Rally',
    date: 'November 2026',
    tag: 'Environmental Action',
    desc: 'Mobilizing youth for zero-waste segregation, organic composting workshops, and community environmental awareness.',
  },
  {
    id: 'up-nature-nexus',
    num: '08 / 11',
    title: 'NATURE NEXUS WORKSHOP: Reconnect with Nature',
    subtitle: 'Mind Relaxation, Clean Mind & Tree Plantation Workshop',
    date: 'Late November 2026',
    tag: '🧘 Mind & Nature Workshop',
    desc: 'A transformative workshop to reconnect with nature — focusing on mind relaxation, mental clarity, hands-on tree planting, exploring nature’s wonders, and learning new eco-skills.',
    posterUrl: '/club-assets/nature-nexus-poster.jpg',
    posterCaption: 'Official Nature Nexus Workshop Poster',
  },
  {
    id: 'up-trekking',
    num: '09 / 11',
    title: 'ECO RHYTHM: Trekking & Nature Exploration',
    subtitle: 'Reveal Soon',
    date: 'December 2026',
    tag: '🥾 Eco Trek & Camp',
    desc: 'Tracking Eco Rhythm — New Trails · New Experiences · Same Planet. Guided wilderness expedition featuring trekking adventures, nature exploration, eco-awareness, and lasting memories.',
    posterUrl: '/club-assets/trekking-poster.jpg',
    posterCaption: 'Official EcoRhythm Trekking Poster',
  },
  {
    id: 'up-yogathon',
    num: '10 / 11',
    title: 'YOGATHON: Spreading The Importance of Yoga',
    subtitle: 'Mindfulness & Physical Vitality Marathon',
    date: 'January 2027',
    tag: 'Holistic Wellness',
    desc: 'Campus-wide morning yoga marathon uniting engineering departments in physical health, mindfulness, and eco-consciousness.',
  },
  {
    id: 'up-ecothon-6',
    num: '11 / 11',
    title: 'THE ECOTHON 6.0: The National Level HACKATHON of Sipna',
    subtitle: 'The Biggest Hackathon of Sipna College',
    date: 'March 2027',
    tag: '⭐ THE BIGGEST HACKATHON OF SIPNA COLLEGE',
    desc: 'Flagship 12-hour national innovation hackathon with nationwide collegiate teams solving urgent environmental, EV, renewable energy, and circular economy challenges.',
    isFlagship: true,
  },
]

// ─── Component: Top Scroll Progress Bar ──────────────────────────────────────
function ScrollProgressBar({ progress }: { progress: number }) {
  return (
    <div className="site-scroll-progress" aria-hidden="true">
      <div
        className="site-scroll-progress__bar"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  )
}

// ─── Component: Floating Back to Top Button ────────────────────────────────────
function BackToTopButton({ visible, progress }: { visible: boolean; progress: number }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const radius = 18
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference * (1 - progress)

  return (
    <button
      className={`back-to-top${visible ? ' back-to-top--visible' : ''}`}
      onClick={scrollToTop}
      aria-label="Scroll to top of page"
      title="Back to top"
    >
      <svg className="back-to-top__ring" width="46" height="46" viewBox="0 0 46 46" aria-hidden="true">
        <circle
          className="back-to-top__ring-bg"
          cx="23"
          cy="23"
          r={radius}
          strokeWidth="3"
        />
        <circle
          className="back-to-top__ring-fill"
          cx="23"
          cy="23"
          r={radius}
          strokeWidth="3"
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: strokeDashoffset,
          }}
        />
      </svg>
      <span className="back-to-top__icon" aria-hidden="true">↑</span>
    </button>
  )
}

// ─── Component: Navbar ────────────────────────────────────────────────────────
interface NavbarProps {
  activeSection: string
}

function Navbar({ activeSection }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
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
            <a
              href="#journey"
              className={`site-nav__link ${activeSection === 'journey' ? 'site-nav__link--active' : ''}`}
              onClick={(e) => { e.preventDefault(); scrollTo('journey') }}
            >
              THE JOURNEY
            </a>
            <a
              href="#what-next"
              className={`site-nav__link ${activeSection === 'what-next' ? 'site-nav__link--active' : ''}`}
              onClick={(e) => { e.preventDefault(); scrollTo('what-next') }}
            >
              WHAT NEXT
            </a>
            <a
              href="#people"
              className={`site-nav__link ${activeSection === 'people' ? 'site-nav__link--active' : ''}`}
              onClick={(e) => { e.preventDefault(); scrollTo('people') }}
            >
              THE PEOPLE
            </a>
            <a
              href="#join"
              className={`site-nav__link site-nav__link--cta ${activeSection === 'join' ? 'site-nav__link--active-cta' : ''}`}
              onClick={(e) => { e.preventDefault(); scrollTo('join') }}
            >
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
          <a
            href="#journey"
            className={`mobile-drawer__link ${activeSection === 'journey' ? 'mobile-drawer__link--active' : ''}`}
            onClick={(e) => { e.preventDefault(); scrollTo('journey') }}
          >
            THE JOURNEY
          </a>
          <a
            href="#what-next"
            className={`mobile-drawer__link ${activeSection === 'what-next' ? 'mobile-drawer__link--active' : ''}`}
            onClick={(e) => { e.preventDefault(); scrollTo('what-next') }}
          >
            WHAT NEXT
          </a>
          <a
            href="#people"
            className={`mobile-drawer__link ${activeSection === 'people' ? 'mobile-drawer__link--active' : ''}`}
            onClick={(e) => { e.preventDefault(); scrollTo('people') }}
          >
            THE PEOPLE
          </a>
          <a
            href="#join"
            className={`mobile-drawer__link mobile-drawer__link--highlight ${activeSection === 'join' ? 'mobile-drawer__link--active-highlight' : ''}`}
            onClick={(e) => { e.preventDefault(); scrollTo('join') }}
          >
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

// ─── Component: Fullscreen Photo Lightbox Modal ───────────────────────────────
export interface PhotoLightboxData {
  url: string
  title: string
  caption?: string
  photoIndex?: number
  totalPhotos?: number
  onPrev?: () => void
  onNext?: () => void
}

interface PhotoLightboxModalProps {
  photo: PhotoLightboxData | null
  onClose: () => void
}

function PhotoLightboxModal({ photo, onClose }: PhotoLightboxModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft' && photo?.onPrev) photo.onPrev()
      if (e.key === 'ArrowRight' && photo?.onNext) photo.onNext()
    }
    if (photo) {
      window.addEventListener('keydown', handleKeyDown)
    }
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [photo, onClose])

  if (!photo) return null

  return (
    <div className="modal-backdrop photo-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="photo-modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="photo-modal-close" onClick={onClose} aria-label="Close full photo view">
          ✕
        </button>

        {photo.onPrev && (
          <button
            className="photo-modal-nav photo-modal-nav--prev"
            onClick={(e) => { e.stopPropagation(); photo.onPrev?.() }}
            aria-label="Previous photo"
            title="Previous photo (Left Arrow)"
          >
            ‹
          </button>
        )}

        {photo.onNext && (
          <button
            className="photo-modal-nav photo-modal-nav--next"
            onClick={(e) => { e.stopPropagation(); photo.onNext?.() }}
            aria-label="Next photo"
            title="Next photo (Right Arrow)"
          >
            ›
          </button>
        )}

        <div className="photo-modal-img-frame">
          <img src={photo.url} alt={photo.caption || photo.title} className="photo-modal-img" />
        </div>

        <div className="photo-modal-info">
          <div className="photo-modal-header">
            <span className="photo-modal-tag">🌿 ARCHIVE PHOTOGRAPH</span>
            {photo.totalPhotos && photo.photoIndex !== undefined && (
              <span className="photo-modal-counter">Photo {photo.photoIndex + 1} of {photo.totalPhotos}</span>
            )}
          </div>
          <h3 className="photo-modal-title">{photo.title}</h3>
          {photo.caption && <p className="photo-modal-caption">{photo.caption}</p>}
        </div>
      </div>
    </div>
  )
}

// ─── Component: Archive / Field Note Modal Popup ──────────────────────────────
interface EventModalProps {
  event: PastEvent | null
  onClose: () => void
  onOpenPhoto: (event: PastEvent, photoIndex: number) => void
}

function EventModal({ event, onClose, onOpenPhoto }: EventModalProps) {
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
                  Curated photographic records from the SCOET Natures Club live field logs. Click pictures to view full size.
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Two Photographs (Clickable for full picture) */}
          <div className="field-note-card__gallery">
            {event.photos.map((photo, i) => (
              <div
                className="field-note-card__photo-frame"
                key={i}
                onClick={() => onOpenPhoto(event, i)}
                role="button"
                tabIndex={0}
                aria-label={`View full picture: ${event.photoCaptions[i]}`}
                title="Click to view full picture"
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onOpenPhoto(event, i) }}
              >
                <div className="field-note-card__photo-img-wrap">
                  <img
                    src={photo}
                    alt={`${event.title} documentary snapshot ${i + 1}`}
                    className="field-note-card__photo"
                    loading="lazy"
                  />
                  <div className="field-note-card__photo-zoom-hint">
                    <span>🔍 Full Picture</span>
                  </div>
                </div>
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

// ─── Dynamic S-Curve Path Generator ───────────────────────────────────────────
// Generates SVG path 'd' string that dynamically sweeps through EVERY node center
// by measuring real DOM positions or using exact fractions.
function computeSPath(timelineEl: HTMLElement | null, count: number): { pathD: string; nodeFractions: number[] } {
  const c = Math.max(count, 1)
  const viewBoxHeight = 1000
  const centerX = 200
  const rightX = 330
  const leftX = 70

  let nodeYs: number[] = []
  if (timelineEl) {
    const nodes = Array.from(timelineEl.querySelectorAll('.scurve-item__node')) as HTMLElement[]
    const timelineRect = timelineEl.getBoundingClientRect()
    if (nodes.length === c && timelineRect.height > 0) {
      nodeYs = nodes.map(node => {
        const nodeRect = node.getBoundingClientRect()
        const relativeY = (nodeRect.top + nodeRect.height / 2) - timelineRect.top
        return Math.max(25, Math.min(viewBoxHeight - 25, (relativeY / timelineRect.height) * viewBoxHeight))
      })
    }
  }

  // Fallback: perfectly distributed
  if (nodeYs.length !== c) {
    nodeYs = Array.from({ length: c }, (_, i) => ((i + 0.5) / c) * viewBoxHeight)
  }

  let pathD = `M ${centerX} 0`
  const y0 = nodeYs[0]
  pathD += ` C ${centerX} ${y0 * 0.4}, ${centerX} ${y0 * 0.8}, ${centerX} ${y0}`

  for (let i = 0; i < c - 1; i++) {
    const yStart = nodeYs[i]
    const yEnd = nodeYs[i + 1]
    const swingX = i % 2 === 0 ? rightX : leftX
    pathD += ` C ${swingX} ${yStart + (yEnd - yStart) * 0.35}, ${swingX} ${yStart + (yEnd - yStart) * 0.65}, ${centerX} ${yEnd}`
  }

  const yLast = nodeYs[c - 1]
  const rem = viewBoxHeight - yLast
  pathD += ` C ${centerX} ${yLast + rem * 0.4}, ${centerX} ${yLast + rem * 0.8}, ${centerX} ${viewBoxHeight}`

  const nodeFractions = nodeYs.map(y => y / viewBoxHeight)
  return { pathD, nodeFractions }
}

// ─── Component: Scroll-Driven Draw-On S-Curve ──────────────────────────────────
interface ScrollSCurveProps {
  isFuture?: boolean
  nodeCount: number
  sectionRef: React.RefObject<HTMLElement | null>
  onLitChange: (litStates: boolean[]) => void
}

function ScrollSCurve({ isFuture = false, nodeCount, sectionRef, onLitChange }: ScrollSCurveProps) {
  const pathRef = useRef<SVGPathElement>(null)
  const glowPathRef = useRef<SVGPathElement>(null)
  const [pathData, setPathData] = useState(() => computeSPath(null, nodeCount))
  const litRef = useRef<boolean[]>(Array(nodeCount).fill(false))
  const smoothRef = useRef<number>(0)
  const rafRef = useRef<number>(0)
  const onLitChangeRef = useRef(onLitChange)
  onLitChangeRef.current = onLitChange

  const updateGeometry = useCallback(() => {
    const section = sectionRef.current
    if (!section) return
    const timelineEl = (section.querySelector('.scurve-timeline') as HTMLElement) || section
    const newPath = computeSPath(timelineEl, nodeCount)
    setPathData(newPath)
  }, [sectionRef, nodeCount])

  useEffect(() => {
    updateGeometry()
    const timer = setTimeout(updateGeometry, 200)
    window.addEventListener('resize', updateGeometry, { passive: true })

    const section = sectionRef.current
    let resizeObserver: ResizeObserver | null = null
    if (section && typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => updateGeometry())
      resizeObserver.observe(section)
    }

    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', updateGeometry)
      if (resizeObserver) resizeObserver.disconnect()
    }
  }, [updateGeometry, sectionRef])

  const gradientId = isFuture ? 'sCurveGradFuture' : 'sCurveGradPast'
  const glowFilterId = isFuture ? 'sCurveGlowFilterFuture' : 'sCurveGlowFilterPast'

  useEffect(() => {
    const path = pathRef.current
    const glowPath = glowPathRef.current
    if (!path) return

    let totalLen = path.getTotalLength()
    const updateDashArrays = () => {
      totalLen = path.getTotalLength()
      if (totalLen > 0) {
        path.style.strokeDasharray = `${totalLen}`
        if (glowPath) glowPath.style.strokeDasharray = `${totalLen}`
      }
    }
    updateDashArrays()

    const getTargetProgress = () => {
      const section = sectionRef.current
      if (!section) return 0
      const timelineEl = (section.querySelector('.scurve-timeline') as HTMLElement) || section
      const rect = timelineEl.getBoundingClientRect()
      const vh = window.innerHeight

      // Optimal focus viewport line (60% down the screen)
      const focusY = vh * 0.60
      const scrolled = focusY - rect.top
      const total = rect.height
      if (total <= 0) return 0

      return Math.min(Math.max(scrolled / total, 0), 1)
    }

    let active = true

    const tick = () => {
      if (!active) return

      const target = getTargetProgress()
      const diff = target - smoothRef.current

      // Responsive lerp factor (0.22) for instant, silky tracking scrolling down AND up
      if (Math.abs(diff) > 0.0002) {
        smoothRef.current += diff * 0.22
      } else {
        smoothRef.current = target
      }

      const cur = smoothRef.current
      const offset = totalLen * (1 - cur)
      path.style.strokeDashoffset = `${offset}`
      if (glowPath) {
        glowPath.style.strokeDashoffset = `${offset}`
      }

      // Bidirectional node lighting with hysteresis
      // Lights when line reaches node (cur >= frac - 0.015)
      // Unlights smoothly when line retracts above node (cur < frac - 0.035)
      const fracs = pathData.nodeFractions
      const currentLit = [...litRef.current]
      let changed = false

      fracs.forEach((frac, i) => {
        const isCurrentlyLit = currentLit[i]
        if (!isCurrentlyLit && cur >= frac - 0.015) {
          currentLit[i] = true
          changed = true
        } else if (isCurrentlyLit && cur < frac - 0.035) {
          currentLit[i] = false
          changed = true
        }
      })

      if (changed) {
        litRef.current = currentLit
        onLitChangeRef.current(currentLit)
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)

    return () => {
      active = false
      cancelAnimationFrame(rafRef.current)
    }
  }, [sectionRef, pathData])

  return (
    <div className="scurve-svg-wrap" aria-hidden="true">
      <svg
        className="scurve-svg"
        viewBox="0 0 400 1000"
        preserveAspectRatio="none"
      >
        <defs>
          {/* Vibrant gradient — bright lime → vivid green for past, lime → gold → amber for future */}
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
            {isFuture ? (
              <>
                <stop offset="0%" stopColor="#d4fc79" stopOpacity="0.85" />
                <stop offset="25%" stopColor="#f9ca24" stopOpacity="1" />
                <stop offset="60%" stopColor="#f0932b" stopOpacity="1" />
                <stop offset="100%" stopColor="#e55039" stopOpacity="0.85" />
              </>
            ) : (
              <>
                <stop offset="0%" stopColor="#c6f135" stopOpacity="0.9" />
                <stop offset="35%" stopColor="#00e676" stopOpacity="1" />
                <stop offset="70%" stopColor="#00c853" stopOpacity="1" />
                <stop offset="100%" stopColor="#1b5e20" stopOpacity="0.8" />
              </>
            )}
          </linearGradient>

          {/* Soft wide outer glow */}
          <filter id={`${glowFilterId}_soft`} x="-60%" y="-5%" width="220%" height="110%">
            <feGaussianBlur stdDeviation="14" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>

          {/* Crisp inner glow */}
          <filter id={glowFilterId} x="-35%" y="-5%" width="170%" height="110%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Ghost rail — always visible, whisper faint */}
        <path
          d={pathData.pathD}
          stroke={isFuture ? 'rgba(249,202,36,0.07)' : 'rgba(0,230,118,0.07)'}
          strokeWidth="18"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Wide soft glow halo — animated draw-on */}
        <path
          d={pathData.pathD}
          stroke={isFuture ? 'rgba(240,147,43,0.18)' : 'rgba(0,200,83,0.18)'}
          strokeWidth="22"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter={`url(#${glowFilterId}_soft)`}
          ref={glowPathRef}
          style={{ willChange: 'stroke-dashoffset' }}
        />

        {/* Main crisp draw-on line */}
        <path
          ref={pathRef}
          d={pathData.pathD}
          stroke={`url(#${gradientId})`}
          strokeWidth="4.5"
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

// ─── Helper: Structured Timeline Title Formatter ──────────────────────────────
function renderTimelineTitle(title: string, isFlagship?: boolean) {
  if (title.includes(':')) {
    const [mainPart, ...rest] = title.split(':')
    const subPart = rest.join(':').trim()
    return (
      <span className={`scurve-item__title-group ${isFlagship ? 'scurve-item__title-group--flagship' : ''}`}>
        <span className="scurve-item__title-main">{mainPart.trim()}</span>
        <span className="scurve-item__title-sub">{subPart}</span>
      </span>
    )
  }
  return <span>{title}</span>
}

// ─── Component: The Journey (Past Events S-Curve Timeline) ─────────────────────
interface JourneySectionProps {
  onSelectEvent: (event: PastEvent) => void
  onOpenPhoto: (event: PastEvent, photoIndex: number) => void
}

function JourneySection({ onSelectEvent, onOpenPhoto }: JourneySectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const [litNodes, setLitNodes] = useState<boolean[]>(Array(PAST_EVENTS.length).fill(false))

  const handleLitChange = (newLit: boolean[]) => {
    setLitNodes(newLit)
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
            onLitChange={handleLitChange}
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
                    <h3 className="scurve-item__heading">{renderTimelineTitle(event.title)}</h3>
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

                      {/* Photo Thumbnail Previews (Clickable for full picture) */}
                      <div className="glass-card__thumbs">
                        {event.photos.map((photo, pIdx) => (
                          <div
                            key={pIdx}
                            className="glass-card__thumb-wrap"
                            onClick={(e) => {
                              e.stopPropagation()
                              onOpenPhoto(event, pIdx)
                            }}
                            role="button"
                            tabIndex={0}
                            aria-label={`View full picture ${pIdx + 1} for ${event.title}`}
                            title={`Click to view full picture: ${event.photoCaptions[pIdx]}`}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' || e.key === ' ') {
                                e.stopPropagation()
                                onOpenPhoto(event, pIdx)
                              }
                            }}
                          >
                            <img src={photo} alt={`${event.title} snapshot ${pIdx + 1}`} loading="lazy" />
                            <div className="glass-card__thumb-zoom">
                              <span>🔍 View Full</span>
                            </div>
                          </div>
                        ))}
                        <div className="glass-card__thumbs-cta">
                          <span>View 2 Photos &amp; Field Note ↗</span>
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

// ─── Component: Poster Lightbox Modal ──────────────────────────────────────────
interface PosterModalProps {
  poster: { url: string; title: string; subtitle?: string } | null
  onClose: () => void
}

function PosterModal({ poster, onClose }: PosterModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (poster) {
      window.addEventListener('keydown', handleKeyDown)
    }
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [poster, onClose])

  if (!poster) return null

  return (
    <div className="modal-backdrop poster-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="poster-modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="poster-modal-close" onClick={onClose} aria-label="Close poster preview">
          ✕
        </button>

        <div className="poster-modal-img-frame">
          <img src={poster.url} alt={poster.title} className="poster-modal-img" />
        </div>
      </div>
    </div>
  )
}

// ─── Component: What Next (Upcoming Events S-Curve Roadmap) ───────────────────
function WhatNextSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [litNodes, setLitNodes] = useState<boolean[]>(Array(UPCOMING_EVENTS.length).fill(false))
  const [selectedPoster, setSelectedPoster] = useState<{ url: string; title: string; subtitle?: string } | null>(null)

  const handleLitChange = (newLit: boolean[]) => {
    setLitNodes(newLit)
  }

  return (
    <>
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
              onLitChange={handleLitChange}
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
                        {renderTimelineTitle(event.title, event.isFlagship)}
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

                        {/* Interactive Poster Banner if Available */}
                        {event.posterUrl && (
                          <div
                            className="event-poster-card"
                            onClick={() => setSelectedPoster({ url: event.posterUrl!, title: event.title, subtitle: event.subtitle })}
                            role="button"
                            tabIndex={0}
                            aria-label={`View official announcement poster for ${event.title}`}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' || e.key === ' ') {
                                setSelectedPoster({ url: event.posterUrl!, title: event.title, subtitle: event.subtitle })
                              }
                            }}
                          >
                            <img
                              src={event.posterUrl}
                              alt={`${event.title} Official Poster`}
                              className="event-poster-card__img"
                              loading="lazy"
                            />
                            <div className="event-poster-card__overlay">
                              <span className="event-poster-card__badge">🎨 View Official Poster ↗</span>
                            </div>
                          </div>
                        )}

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

      {/* Poster Lightbox Modal */}
      <PosterModal poster={selectedPoster} onClose={() => setSelectedPoster(null)} />
    </>
  )
}

// ─── Component: Interactive Member Card with Cursor Movement Animation ──────
interface InteractiveMemberCardProps {
  className?: string
  children: React.ReactNode
}

function InteractiveMemberCard({ className = '', children }: InteractiveMemberCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    card.style.setProperty('--mouse-x', `${x}px`)
    card.style.setProperty('--mouse-y', `${y}px`)
  }

  const handleMouseLeave = () => {
    const card = cardRef.current
    if (!card) return
    card.style.removeProperty('--mouse-x')
    card.style.removeProperty('--mouse-y')
  }

  return (
    <div
      ref={cardRef}
      className={`bento-card interactive-member-card ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="member-card__spotlight" aria-hidden="true" />
      <div className="member-card__corner-leaf" aria-hidden="true">🍃</div>
      {children}
    </div>
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
            <InteractiveMemberCard className="bento-card--admin">
              <div className="bento-card__avatar-badge">Dean</div>
              <div className="bento-card__role">Dean - Student Affairs</div>
              <h4 className="bento-card__name">Dr. P. R. Malasane</h4>
              <p className="bento-card__desc">Sipna College of Engineering &amp; Technology, Amravati</p>
            </InteractiveMemberCard>

            <InteractiveMemberCard className="bento-card--admin">
              <div className="bento-card__avatar-badge">Advisor &amp; Incharge</div>
              <div className="bento-card__role">Faculty Advisor &amp; Club Incharge</div>
              <h4 className="bento-card__name">Prof. Sanjivani Harne</h4>
              <p className="bento-card__desc">Faculty Advisor &amp; Nature Club Incharge · Department of Applied Sciences &amp; Environmental Studies, SCOET</p>
            </InteractiveMemberCard>
          </div>
        </div>

        {/* Core Committee 2026-27 */}
        <div className="bento-section">
          <h3 className="bento-tier-title">🌿 Nature Club Core Committee 2026-27</h3>

          {/* Top Leaders Row: President & Vice President highlighted in Green on top */}
          <div className="bento-grid bento-grid--presidents">
            <InteractiveMemberCard className="bento-card--president bento-card--has-avatar">
              <div className="bento-card__avatar-wrap">
                <img src="/club-assets/aditya-rathod.png" alt="Aditya Rathod" className="bento-card__avatar-img" />
              </div>
              <div className="bento-card__info">
                <div className="bento-card__role-tag bento-card__role-tag--green">President</div>
                <h4 className="bento-card__name">Aditya Rathod</h4>
                <p className="bento-card__desc">Head of Club Strategy &amp; Environmental Outreach</p>
              </div>
            </InteractiveMemberCard>

            <InteractiveMemberCard className="bento-card--president bento-card--has-avatar">
              <div className="bento-card__avatar-wrap">
                <img src="/club-assets/krutika-bonde.png" alt="Krutika Bonde" className="bento-card__avatar-img" />
              </div>
              <div className="bento-card__info">
                <div className="bento-card__role-tag bento-card__role-tag--green">Vice President</div>
                <h4 className="bento-card__name">Krutika Bonde</h4>
                <p className="bento-card__desc">Operations &amp; Student Drive Logistics</p>
              </div>
            </InteractiveMemberCard>
          </div>

          {/* Other Members Below */}
          <div className="bento-grid bento-grid--core-members">
            <InteractiveMemberCard className="bento-card--slot">
              <div className="bento-card__role-tag slot-tag">Secretary</div>
              <h4 className="bento-card__name">Tanvi Rane</h4>
              <p className="bento-card__desc">Documentation, Liaison &amp; Event Coordination</p>
            </InteractiveMemberCard>

            <InteractiveMemberCard className="bento-card--slot">
              <div className="bento-card__role-tag slot-tag">Treasurer</div>
              <h4 className="bento-card__name">Swaraj Ingole</h4>
              <p className="bento-card__desc">Finance &amp; Resource Allocation</p>
            </InteractiveMemberCard>

            <InteractiveMemberCard className="bento-card--slot">
              <div className="bento-card__role-tag slot-tag">Technical Head</div>
              <h4 className="bento-card__name">Sarthak Kulkarni</h4>
              <p className="bento-card__desc">Web, Digital Platforms &amp; Tech Operations</p>
            </InteractiveMemberCard>

            <InteractiveMemberCard className="bento-card--slot">
              <div className="bento-card__role-tag slot-tag">Public Relations Officer (PRO)</div>
              <h4 className="bento-card__name">Ayush Zode</h4>
              <p className="bento-card__desc">Media, Design &amp; Digital Communications</p>
            </InteractiveMemberCard>

            <InteractiveMemberCard className="bento-card--slot">
              <div className="bento-card__role-tag slot-tag">Executive Member</div>
              <h4 className="bento-card__name">Kirkiti Chaudhari</h4>
              <p className="bento-card__desc">Field Operations, Hackathons &amp; Event Logistics</p>
            </InteractiveMemberCard>

            <InteractiveMemberCard className="bento-card--slot">
              <div className="bento-card__role-tag slot-tag">Executive Member</div>
              <h4 className="bento-card__name">Sahil Markar</h4>
              <p className="bento-card__desc">On-ground Taskforce &amp; Plantation Drives</p>
            </InteractiveMemberCard>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Component: QR Lightbox / Zoom Modal ──────────────────────────────────────
interface QRModalProps {
  isOpen: boolean
  onClose: () => void
}

function QRModal({ isOpen, onClose }: QRModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown)
    }
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="modal-backdrop qr-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="qr-modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="qr-modal-close" onClick={onClose} aria-label="Close QR display">
          ✕
        </button>

        <div className="qr-modal-badge">
          <span>🌱</span> SIPNA SCOET NATURES CLUB
        </div>

        <h3 className="qr-modal-title">Scan to Register</h3>
        <p className="qr-modal-subtitle">
          Point any smartphone camera or QR scanner at the code below to open the official club registration form.
        </p>

        <div className="qr-modal-img-frame">
          <img
            src="/club-assets/qr-code.png"
            alt="Natures Club Fullscreen Registration QR Code"
            className="qr-modal-img"
          />
        </div>

        <div className="qr-modal-footer">
          <div className="qr-modal-hint">
            <span className="pulse-dot" /> Official Membership Drive 2026-27
          </div>
          <button className="btn-pill btn-pill--dark" onClick={onClose}>
            Done / Close
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Component: Join & Footer with Stylized QR Code ───────────────────────────
function JoinSection() {
  const [copied, setCopied] = useState(false)
  const [qrZoomed, setQrZoomed] = useState(false)
  const [clickedSocial, setClickedSocial] = useState<string | null>(null)

  const copyEmail = () => {
    navigator.clipboard.writeText('sipnanaturesclub@gmail.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  const handleSocialClick = (key: string) => {
    setClickedSocial(key)
    setTimeout(() => setClickedSocial(null), 600)
  }

  const SOCIALS = [
    {
      key: 'instagram',
      label: 'Instagram',
      icon: '📸',
      href: 'https://www.instagram.com/sipna_natures_club?igsh=Z2E3cXZtdG1zemhy',
      color: '#e1306c',
      glow: 'rgba(225,48,108,0.45)',
    },
    {
      key: 'youtube',
      label: 'YouTube',
      icon: '▶',
      href: 'https://youtube.com/@sipnanatureclub-amravati?si=imMTSjerLqC5AlDg',
      color: '#ff0000',
      glow: 'rgba(255,0,0,0.4)',
    },
    {
      key: 'linkedin',
      label: 'LinkedIn',
      icon: '💼',
      href: 'https://www.linkedin.com/in/sipna-nature-club-86923b220?utm_source=share_via&utm_content=profile&utm_medium=member_android',
      color: '#0a66c2',
      glow: 'rgba(10,102,194,0.45)',
    },
    {
      key: 'email',
      label: 'Gmail',
      icon: '✉',
      href: 'mailto:sipnanaturesclub@gmail.com',
      color: '#00c853',
      glow: 'rgba(0,200,83,0.45)',
    },
  ]

  return (
    <>
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

                {/* Social Links with Animated Ripple */}
                <div className="join-card__socials">
                  {SOCIALS.map((s) => (
                    <a
                      key={s.key}
                      href={s.href}
                      target={s.key !== 'email' ? '_blank' : undefined}
                      rel={s.key !== 'email' ? 'noreferrer' : undefined}
                      className={`social-pill ${clickedSocial === s.key ? 'social-pill--clicked' : ''}`}
                      style={{ '--social-color': s.color, '--social-glow': s.glow } as React.CSSProperties}
                      onClick={() => handleSocialClick(s.key)}
                      aria-label={`Follow us on ${s.label}`}
                      title={s.label}
                    >
                      <span className="social-pill__icon">{s.icon}</span>
                      <span className="social-pill__label">{s.label}</span>
                      <span className="social-pill__ripple" />
                    </a>
                  ))}
                </div>

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
                  <button className={`btn-pill btn-pill--ghost-cream ${copied ? 'btn-pill--copied' : ''}`} onClick={copyEmail}>
                    {copied ? '✓ Email Copied!' : 'Copy Club Email 📋'}
                  </button>
                </div>
              </div>

              {/* Right: QR Code Scanner Card (Clickable to Expand) */}
              <div className="join-card__qr-side">
                <div
                  className="qr-frame qr-frame--interactive"
                  onClick={() => setQrZoomed(true)}
                  role="button"
                  tabIndex={0}
                  aria-label="Click to enlarge QR code for scanning"
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setQrZoomed(true) }}
                >
                  <div className="qr-frame__scanner-line" />
                  <div className="qr-frame__corner qr-frame__corner--tl" />
                  <div className="qr-frame__corner qr-frame__corner--tr" />
                  <div className="qr-frame__corner qr-frame__corner--bl" />
                  <div className="qr-frame__corner qr-frame__corner--br" />

                  <div className="qr-frame__img-wrap">
                    <img
                      src="/club-assets/qr-code.png"
                      alt="Natures Club Registration QR Code"
                      className="qr-img"
                    />
                    <div className="qr-zoom-overlay">
                      <span>🔍 Tap to expand</span>
                    </div>
                  </div>

                  <div className="qr-frame__label">
                    <strong>SCAN TO JOIN THE CLUB</strong>
                    <span>Click to enlarge QR for easy scanning 🔍</span>
                  </div>
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
                <div className="site-footer__nav-title">Contact &amp; Social</div>
                <ul className="site-footer__links">
                  <li><a href="mailto:sipnanaturesclub@gmail.com">sipnanaturesclub@gmail.com</a></li>
                  <li><a href="https://www.instagram.com/sipna_natures_club?igsh=Z2E3cXZtdG1zemhy" target="_blank" rel="noreferrer">📸 Instagram</a></li>
                  <li><a href="https://youtube.com/@sipnanatureclub-amravati?si=imMTSjerLqC5AlDg" target="_blank" rel="noreferrer">▶ YouTube</a></li>
                  <li><a href="https://www.linkedin.com/in/sipna-nature-club-86923b220?utm_source=share_via&amp;utm_content=profile&amp;utm_medium=member_android" target="_blank" rel="noreferrer">💼 LinkedIn</a></li>
                  <li><a href="https://sipnaengg.ac.in" target="_blank" rel="noreferrer">sipnaengg.ac.in</a></li>
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

      {/* QR Fullscreen Lightbox Zoom Modal */}
      <QRModal isOpen={qrZoomed} onClose={() => setQrZoomed(false)} />
    </>
  )
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [selectedEvent, setSelectedEvent] = useState<PastEvent | null>(null)
  const [activePhoto, setActivePhoto] = useState<{
    event: PastEvent
    photoIndex: number
  } | null>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  // Smooth Scroll Progress & Active Section Observer
  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight
          const currentScroll = window.scrollY
          const progress = totalHeight > 0 ? Math.min(Math.max(currentScroll / totalHeight, 0), 1) : 0

          setScrollProgress(progress)
          setShowBackToTop(currentScroll > 320)
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    // IntersectionObserver for active navigation section
    const sectionIds = ['home', 'journey', 'what-next', 'people', 'join']
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -55% 0px',
      threshold: 0,
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }, observerOptions)

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    // Scroll reveal observer for elements
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed')
          }
        })
      },
      { rootMargin: '0px 0px -60px 0px', threshold: 0.1 }
    )

    const revealElements = document.querySelectorAll(
      '.bento-card, .bento-section, .join-card, .section-header-grid, .photo-modal-card, .field-note-card'
    )
    revealElements.forEach((el) => {
      el.classList.add('reveal-on-scroll')
      revealObserver.observe(el)
    })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      observer.disconnect()
      revealObserver.disconnect()
    }
  }, [])

  const handleOpenPhoto = (event: PastEvent, photoIndex: number) => {
    setActivePhoto({ event, photoIndex })
  }

  const handlePrevPhoto = () => {
    if (!activePhoto) return
    const count = activePhoto.event.photos.length
    const nextIdx = (activePhoto.photoIndex - 1 + count) % count
    setActivePhoto({ event: activePhoto.event, photoIndex: nextIdx })
  }

  const handleNextPhoto = () => {
    if (!activePhoto) return
    const count = activePhoto.event.photos.length
    const nextIdx = (activePhoto.photoIndex + 1) % count
    setActivePhoto({ event: activePhoto.event, photoIndex: nextIdx })
  }

  const currentPhotoData: PhotoLightboxData | null = activePhoto ? {
    url: activePhoto.event.photos[activePhoto.photoIndex],
    title: activePhoto.event.title,
    caption: activePhoto.event.photoCaptions[activePhoto.photoIndex],
    photoIndex: activePhoto.photoIndex,
    totalPhotos: activePhoto.event.photos.length,
    onPrev: activePhoto.event.photos.length > 1 ? handlePrevPhoto : undefined,
    onNext: activePhoto.event.photos.length > 1 ? handleNextPhoto : undefined,
  } : null

  return (
    <div className="app-root">
      {/* Top Scroll Progress Indicator */}
      <ScrollProgressBar progress={scrollProgress} />

      {/* Sticky Glassmorphic Navbar with Active Section Spy */}
      <Navbar activeSection={activeSection} />

      <main>
        <Hero />
        <JourneySection
          onSelectEvent={setSelectedEvent}
          onOpenPhoto={handleOpenPhoto}
        />
        <WhatNextSection />
        <LeadershipSection />
        <JoinSection />
      </main>

      {/* Floating Back to Top Button */}
      <BackToTopButton visible={showBackToTop} progress={scrollProgress} />

      {/* Field Note Event Modal */}
      <EventModal
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
        onOpenPhoto={handleOpenPhoto}
      />

      {/* Fullscreen Photo Lightbox Modal */}
      <PhotoLightboxModal
        photo={currentPhotoData}
        onClose={() => setActivePhoto(null)}
      />
    </div>
  )
}
