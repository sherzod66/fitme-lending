import { useState, Suspense } from "react";
import { useTranslation } from "react-i18next";
import {
  Dumbbell,
  Users,
  LineChart,
  Video,
  Utensils,
  PersonStanding,
  Brain,
  ChevronDown,
  Mail,
  Instagram,
  Facebook,
  Twitter,
  Menu,
  X,
} from "lucide-react";
import { LanguageSwitcher } from "./components/LanguageSwitcher";

function App() {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <nav className="fixed w-full z-50 bg-black/95 border-b border-red-800">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <a href="#" className="block w-36 h-14 p-2">
              <img className="object-contain" src="/FitMe.png" alt="" />
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <button
                onClick={() => scrollToSection("features")}
                className="text-gray-300 hover:text-red-500 transition"
              >
                {t("nav.features")}
              </button>
              <button
                onClick={() => scrollToSection("roles")}
                className="text-gray-300 hover:text-red-500 transition"
              >
                {t("nav.forEveryone")}
              </button>
              <LanguageSwitcher />
              <button className="bg-red-600/50 text-white px-6 py-2 rounded cursor-not-allowed">
                {t("nav.download")}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-gray-300 hover:text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-red-800">
              <div className="flex flex-col gap-4">
                <button
                  onClick={() => scrollToSection("features")}
                  className="text-gray-300 hover:text-red-500 transition"
                >
                  {t("nav.features")}
                </button>
                <button
                  onClick={() => scrollToSection("roles")}
                  className="text-gray-300 hover:text-red-500 transition"
                >
                  {t("nav.forEveryone")}
                </button>
                <LanguageSwitcher />
                <button className="bg-red-600/50 text-white px-6 py-2 rounded cursor-not-allowed">
                  {t("nav.download")}
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative min-h-screen flex items-center justify-center px-4 lg:px-8 pt-16">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1920"
            alt="Background"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
            {t("hero.title")}
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-300">
            {t("hero.subtitle")}
          </p>
          <div className="flex flex-col items-center gap-4 mb-12">
            <p className="text-2xl font-bold text-red-500">
              {t("hero.comingSoon")}
            </p>
            <p className="text-gray-400">{t("hero.betaMessage")}</p>
          </div>
          <button
            onClick={() => scrollToSection("features")}
            className="animate-bounce"
          >
            <ChevronDown className="w-8 h-8 text-gray-400" />
          </button>
        </div>
      </header>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 lg:px-8 bg-zinc-950">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            {t("features.title")}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Users className="w-8 h-8 text-red-500" />,
                titleKey: "features.trainers.title",
                descriptionKey: "features.trainers.description",
              },
              {
                icon: <LineChart className="w-8 h-8 text-red-500" />,
                titleKey: "features.tracking.title",
                descriptionKey: "features.tracking.description",
              },
              {
                icon: <PersonStanding className="w-8 h-8 text-red-500" />,
                titleKey: "features.measurements.title",
                descriptionKey: "features.measurements.description",
              },
              {
                icon: <Video className="w-8 h-8 text-red-500" />,
                titleKey: "features.library.title",
                descriptionKey: "features.library.description",
              },
              {
                icon: <Utensils className="w-8 h-8 text-red-500" />,
                titleKey: "features.nutrition.title",
                descriptionKey: "features.nutrition.description",
              },
              {
                icon: <Dumbbell className="w-8 h-8 text-red-500" />,
                titleKey: "features.workouts.title",
                descriptionKey: "features.workouts.description",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-black border border-red-900/20 p-6 rounded-lg hover:border-red-900 transition"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">
                  {t(feature.titleKey)}
                </h3>
                <p className="text-gray-400">{t(feature.descriptionKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* User Roles Section */}
      <section id="roles" className="py-20 px-4 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            {t("roles.title")}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                titleKey: "roles.beginners.title",
                descriptionKey: "roles.beginners.description",
                icon: <Brain className="w-12 h-12 text-red-400" />,
              },
              {
                titleKey: "roles.advanced.title",
                descriptionKey: "roles.advanced.description",
                icon: <Dumbbell className="w-12 h-12 text-red-500" />,
              },
              {
                titleKey: "roles.trainers.title",
                descriptionKey: "roles.trainers.description",
                icon: <Users className="w-12 h-12 text-red-600" />,
              },
            ].map((role, index) => (
              <div key={index} className="text-center p-6">
                <div className="flex justify-center mb-4">{role.icon}</div>
                <h3 className="text-xl font-semibold mb-2">
                  {t(role.titleKey)}
                </h3>
                <p className="text-gray-400">{t(role.descriptionKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 lg:px-8 bg-gradient-to-r from-red-950 to-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {t("cta.title")}
          </h2>
          <p className="text-xl text-gray-300 mb-8">{t("cta.subtitle")}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white/20 text-white px-8 py-3 rounded-lg cursor-not-allowed">
              {t("cta.comingSoon")}
            </button>
            <button className="bg-transparent border-2 border-red-500 text-red-500 px-8 py-3 rounded-lg hover:bg-red-500 hover:text-white transition">
              {t("cta.becomeTrainer")}
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 lg:px-8 bg-zinc-950">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <a href="#" className="block w-36 h-14 p-2">
              <img className="object-contain" src="/FitMe.png" alt="" />
            </a>
            <div className="flex gap-6">
              <a
                href="mailto:info@fitme.uz"
                className="text-gray-400 hover:text-red-500 transition"
              >
                <Mail className="w-6 h-6" />
              </a>
              {/* <a
                href="#"
                className="text-gray-400 hover:text-red-500 transition"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-red-500 transition"
              >
                <Facebook className="w-6 h-6" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-red-500 transition"
              >
                <Twitter className="w-6 h-6" />
              </a> */}
            </div>
          </div>
          <div className="mt-8 text-center text-gray-400">
            <p>{t("footer.rights")}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function WrappedApp() {
  return (
    <Suspense
      fallback={
        <div className="h-screen w-screen flex items-center justify-center bg-black text-white">
          Loading...
        </div>
      }
    >
      <App />
    </Suspense>
  );
}
