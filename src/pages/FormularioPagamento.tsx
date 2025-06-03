
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { CreditCard, Shield, CheckCircle } from 'lucide-react';

const FormularioPagamento = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="pt-20">
        {/* Header */}
        <section className="fintech-gradient py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
              Finalizar Assinatura
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Complete seus dados e garanta acesso completo à nossa plataforma
            </p>
          </div>
        </section>

        {/* Payment Form */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Form */}
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="w-6 h-6 text-[#1A247E]" />
                      Dados de Pagamento
                    </CardTitle>
                    <CardDescription>
                      Preencha os dados abaixo para completar sua assinatura
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Personal Info */}
                    <div className="space-y-4">
                      <h3 className="font-semibold text-gray-900">Dados Pessoais</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName">Nome</Label>
                          <Input id="firstName" placeholder="Seu nome" />
                        </div>
                        <div>
                          <Label htmlFor="lastName">Sobrenome</Label>
                          <Input id="lastName" placeholder="Seu sobrenome" />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="seu@email.com" />
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="phone">Telefone</Label>
                          <Input id="phone" placeholder="(11) 99999-9999" />
                        </div>
                        <div>
                          <Label htmlFor="cpf">CPF</Label>
                          <Input id="cpf" placeholder="000.000.000-00" />
                        </div>
                      </div>
                    </div>

                    {/* Plan Selection */}
                    <div className="space-y-4">
                      <h3 className="font-semibold text-gray-900">Plano Selecionado</h3>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione um plano" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="basic">Básico - Gratuito</SelectItem>
                          <SelectItem value="premium">Premium - R$ 29,90/mês</SelectItem>
                          <SelectItem value="enterprise">Enterprise - R$ 99,90/mês</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Payment Method */}
                    <div className="space-y-4">
                      <h3 className="font-semibold text-gray-900">Método de Pagamento</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="cardNumber">Número do Cartão</Label>
                          <Input id="cardNumber" placeholder="0000 0000 0000 0000" />
                        </div>
                        <div>
                          <Label htmlFor="cardName">Nome no Cartão</Label>
                          <Input id="cardName" placeholder="Nome como no cartão" />
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="expiry">Validade</Label>
                          <Input id="expiry" placeholder="MM/AA" />
                        </div>
                        <div>
                          <Label htmlFor="cvv">CVV</Label>
                          <Input id="cvv" placeholder="123" />
                        </div>
                        <div>
                          <Label htmlFor="installments">Parcelas</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="1x" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">1x sem juros</SelectItem>
                              <SelectItem value="2">2x sem juros</SelectItem>
                              <SelectItem value="3">3x sem juros</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    <Button className="w-full bg-[#1A247E] hover:bg-[#2D4DE0] text-lg py-3">
                      Finalizar Assinatura
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Order Summary */}
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Resumo do Pedido</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Plano Premium</span>
                        <span>R$ 29,90</span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Desconto primeiro mês</span>
                        <span>-R$ 10,00</span>
                      </div>
                      <hr />
                      <div className="flex justify-between font-semibold text-lg">
                        <span>Total</span>
                        <span className="text-[#1A247E]">R$ 19,90</span>
                      </div>
                    </div>

                    <div className="space-y-3 pt-4">
                      <h4 className="font-semibold">Incluído no plano:</h4>
                      <div className="space-y-2">
                        {[
                          "Acesso completo aos cursos",
                          "Relatórios de progresso",
                          "Suporte prioritário",
                          "Certificados digitais",
                          "App mobile premium"
                        ].map((feature, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span className="text-sm text-gray-600">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-4 text-sm text-gray-600">
                      <Shield className="w-4 h-4" />
                      <span>Pagamento 100% seguro e criptografado</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default FormularioPagamento;
