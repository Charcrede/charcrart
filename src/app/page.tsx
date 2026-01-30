import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#141414] text-white font-poppins">
      {/* HERO */}
      <section className="min-h-[80vh] flex flex-col items-center justify-center px-6 text-center gap-6">
  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-blanka text-white leading-tight">
    Génère des cartes<br />
    <span className="text-[#693382]">visuelles claires</span>
  </h1>

  <p className="max-w-2xl text-gray-400 text-base sm:text-lg">
    Transforme n’importe quel concept, terme ou idée
    <br />
    en une carte visuelle propre, lisible et partageable,
    <br />
    sans outils complexes ni templates lourds.
  </p>

  <div className="flex gap-4 mt-4 flex-wrap justify-center">
    <Link
      href="/cards"
      className="px-6 py-3 rounded-xl bg-[#693382] text-white font-semibold hover:scale-105 transition-transform"
    >
      Créer sa propre carte
    </Link>

    <Link
      href="/admin"
      className="px-6 py-3 rounded-xl border border-[#693382] text-[#693382] hover:bg-[#693382] hover:text-white transition-all"
    >
      Créer une carte
    </Link>
  </div>
</section>


      {/* PREVIEW */}
      <section className="px-6 py-16 max-w-6xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-blanka text-center mb-10">
          Le format
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="relative rounded-xl overflow-hidden border border-white/10 shadow-lg bg-black"
            >
              <img src="/bg.png" alt="preview" />
              <div className="absolute inset-0 p-4 flex flex-col justify-center text-center">
                <p className="font-blanka text-sm absolute top-4 left-4">
                  Jour {i}
                </p>
                <h3 className="font-blanka text-xl mb-2">API</h3>
                <p className="font-edusa text-sm text-gray-200">
                  Une interface qui permet à deux systèmes de communiquer.
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* STORY */}
      <section className="px-6 py-20 max-w-3xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl font-blanka mb-6">
          Pourquoi ce projet ?
        </h2>

        <p className="text-gray-400 leading-relaxed text-base sm:text-lg">
          Ce projet est né d’un besoin très simple :
          <br />
          <span className="text-white font-semibold">
            générer rapidement des cartes visuelles propres et lisibles.
          </span>
          <br />
          <br />
          Pour mes projets, je cherchais un outil
          <br />
          qui permette de transformer une idée, un concept ou un terme
          <br />
          en une image claire, partageable et bien présentée,
          <br />
          sans passer par des outils lourds ou complexes.
          <br />
          <br />
          J’ai donc créé ce service comme un
          <span className="text-white font-semibold"> générateur de cartes visuelles simple et intuitif</span>,
          pensé pour aller droit au but.
        </p>
      </section>


      {/* HOW IT WORKS */}
      <section className="px-6 py-16 max-w-5xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-blanka text-center mb-12">
          Comment ça marche
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <StepCard
            title="Informations"
            description="Ajouter le titre, le texte et le footer de la carte."
          />
          <StepCard
            title="Ajustements"
            description="Personnaliser le fond, la taille du texte, etc."
          />
          <StepCard
            title="Une carte"
            description="Un visuel propre, prêt à être partagé."
          />
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="px-6 py-20 text-center">
        <h2 className="text-3xl sm:text-4xl font-blanka mb-6">
          Apprendre sérieusement.
          <br />
          Sans bullshit.
        </h2>

        <Link
          href="/card"
          className="inline-block mt-4 px-8 py-4 rounded-2xl bg-[#693382] text-white font-semibold hover:scale-105 transition-transform"
        >
          Commencer
        </Link>
      </section>
    </main>
  );
}

function StepCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all">
      <h3 className="font-blanka text-xl mb-3 text-[#693382]">
        {title}
      </h3>
      <p className="text-gray-400 text-sm">{description}</p>
    </div>
  );
}
