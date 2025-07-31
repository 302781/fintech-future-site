import { Button } from "@/components/ui/button";

import heroImage from "@/assets/img/hero-finance.png";

import { ArrowRight } from "lucide-react";

import { Link } from "react-router-dom";



const Hero = () => {

  return (

    <section className="relative min-h-screen flex items-center py-16 overflow-hidden bg-fintech-blue dark:bg-gray-950">



      <div className="absolute inset-0">

        <img

          src={heroImage}

          alt="Pessoas estudando e investindo, representando educação financeira e construção de patrimônio."

          className="w-full h-full object-cover opacity-20 dark:opacity-10"

          loading="eager"

        />

        <div className="absolute inset-0 bg-gradient-to-r from-fintech-blue/90 to-fintech-blue-light/80 dark:from-gray-950/90 dark:to-gray-900/80"></div>

      </div>



      <div className="relative z-10 container mx-auto px-6 text-center lg:text-left">

        <div className="grid lg:grid-cols-2 gap-12 items-center">

          <div className="animate-fadeInUp pt-10 pb-6 lg:py-0">

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white leading-tight mb-6">

              Transforme Sua <br />

              <span className="block bg-gradient-to-r from-yellow-300 to-yellow-100 bg-clip-text text-transparent">

                Vida Financeira

              </span>

            </h1>



            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-xl mx-auto lg:mx-0 opacity-95 leading-relaxed">

              Aprenda a economizar, investir e planejar seu futuro com nossos cursos práticos e ferramentas interativas.

            </p>



            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">

              <Link to="/planos" aria-label="Começar agora e ver todos os planos de assinatura">

                <Button

                  size="lg"

                  className="bg-white text-fintech-blue-dark hover:bg-blue-50 text-lg px-8 py-4 h-auto font-semibold group transition-all duration-300"

                >

                  Começar Agora

                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />

                </Button>

              </Link>

              <Link to="/sobre" aria-label="Saber mais sobre nossa plataforma de educação financeira">

                <Button

                  size="lg"

                  variant="outline"

                  className="border-white text-white hover:bg-white/10 hover:text-white text-lg px-8 py-4 h-auto transition-all duration-300"

                >

                  Saiba Mais

                </Button>

              </Link>

            </div>

          </div>



          <div className="relative flex justify-center lg:justify-end animate-fadeInUp">

            <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-6 md:p-8 animate-pulse-slow">

              <img

                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"

                alt="Dashboard financeiro com gráficos de investimento e economia, simbolizando o controle e o crescimento do dinheiro."

                className="w-full h-auto rounded-2xl shadow-2xl object-cover border border-white/20"

                loading="lazy"

              />

              <div className="absolute -top-6 -right-6 w-28 h-28 bg-white/20 rounded-full animate-bounce-slow opacity-70"></div>

              <div className="absolute -bottom-10 -left-10 w-20 h-20 bg-blue-300/30 rounded-full animate-pulse opacity-60"></div>

            </div>

          </div>

        </div>

      </div>

    </section>

  );

}



export default Hero;