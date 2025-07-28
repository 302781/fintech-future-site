import React from 'react';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { corporatePlans, Plan, PlanFeature } from '@/data/corporatePlansData';

const AssinaturasCorporativas: React.FC = () => {
  return (
    <>
      <Navigation /> {/* Se este componente faz parte do layout geral da página */}
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            Planos para Escolas e Redes de Ensino
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-5 sm:text-2xl">
            Soluções completas para transformar a educação financeira da sua instituição.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-3 sm:max-w-sm sm:mx-auto lg:max-w-none">
          {corporatePlans.map((plan) => (
            <Card
              key={plan.id}
              className={`flex flex-col overflow-hidden rounded-lg shadow-lg ${
                plan.isFeatured ? 'border-4 border-blue-500 transform scale-105 transition-transform duration-300' : ''
              }`}
            >
              <CardHeader className="bg-white px-6 py-8 sm:p-10">
                <p className="mt-2 text-center text-sm font-semibold text-blue-600 uppercase tracking-wide">
                  {plan.isFeatured && 'Recomendado'}
                </p>
                <CardTitle className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                  {plan.title}
                </CardTitle>
                <CardDescription className="mt-2 text-center text-gray-500">
                  {plan.description}
                </CardDescription>
                <div className="mt-8 text-center">
                  <span className="text-4xl font-extrabold text-gray-900">
                    {plan.price}
                  </span>
                  {plan.priceUnit && (
                    <span className="ml-1 text-xl font-medium text-gray-500">
                      {plan.priceUnit}
                    </span>
                  )}
                </div>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-between px-6 py-8 bg-gray-50 sm:p-10">
                <ul role="list" className="mt-6 space-y-4">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <div className="flex-shrink-0">
                        <CheckCircle className="h-6 w-6 text-blue-500" aria-hidden="true" />
                      </div>
                      <p className="ml-3 text-base text-gray-700">
                        {/* Renderiza o texto com negrito se houver ** no início e fim */}
                        {feature.text.startsWith('**') && feature.text.endsWith('**') ? (
                          <strong>{feature.text.slice(2, -2)}</strong>
                        ) : (
                          feature.text
                        )}
                      </p>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="bg-gray-50 px-6 py-8 sm:px-10">
                <Link to={plan.buttonLink} className="w-full">
                  <Button className="w-full text-lg py-3">
                    {plan.buttonText}
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
};

export default AssinaturasCorporativas;
