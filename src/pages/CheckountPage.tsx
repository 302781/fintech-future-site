import React from 'react';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const CheckoutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="pt-20 py-16 flex justify-center items-center">
        <div className="max-w-2xl w-full px-4 sm:px-6 lg:px-8">
          <Card className="shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-[#1A247E]">
                Finalizar Compra
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-gray-700">
                Aqui você poderá rever seu pedido e completar o pagamento.
              </p>
              {/* Adicione o formulário de pagamento e detalhes do pedido aqui */}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;