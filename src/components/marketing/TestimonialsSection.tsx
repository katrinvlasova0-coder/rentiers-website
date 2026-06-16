const testimonials = [
  {
    name: 'Thomas B.',
    role: 'Unternehmer, München',
    text: 'Mein Betriebsvermögen lag jahrelang auf einem Konto mit 0,1% Zinsen. Jetzt generiert es 16% p.a. — ohne dass ich etwas tun muss. Rentiers hat mein Kapital für mich zum Arbeiten gebracht.',
    rating: 5,
    avatar: 'T',
    color: '#3B3BE8',
  },
  {
    name: 'Ingrid M.',
    role: 'Rentnerin, Wien',
    text: 'Endlich wieder von Zinsen leben wie früher. 12% p.a. auf mein Erspartes — vierteljährliche Auszahlung direkt auf die Karte. Das ist das, was ich von meiner Bank nie bekommen habe.',
    rating: 5,
    avatar: 'I',
    color: '#7C3AED',
  },
  {
    name: 'Karim A.',
    role: 'Freiberufler, Zürich',
    text: 'Nach Crypto-Verlusten wollte ich etwas Stabiles mit echter Rendite. Rentiers gibt mir 16% p.a. mit staatlicher Garantie. Das ist der Sweet Spot zwischen Sicherheit und Ertrag.',
    rating: 5,
    avatar: 'K',
    color: '#0891B2',
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5 mb-3">
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className="text-yellow-400 text-lg">★</span>
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-14 max-w-2xl mx-auto">
          <h2
            className="text-3xl md:text-4xl font-extrabold mb-4"
            style={{ color: 'var(--color-dark)' }}
          >
            Was unsere Kunden sagen
          </h2>
          <p className="text-lg" style={{ color: 'var(--color-text-secondary)' }}>
            Echte Anleger, echte Renditen, echte Erfahrungen.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="rounded-2xl p-6 border hover:shadow-lg transition-all duration-300"
              style={{ background: 'var(--color-bg-light)', borderColor: 'transparent' }}
            >
              <Stars count={t.rating} />
              <p
                className="text-sm leading-relaxed mb-6 italic"
                style={{ color: 'var(--color-text-primary)' }}
              >
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                  style={{ background: t.color }}
                >
                  {t.avatar}
                </div>
                <div>
                  <p className="font-semibold text-sm" style={{ color: 'var(--color-dark)' }}>
                    {t.name}
                  </p>
                  <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                    {t.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
