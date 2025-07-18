// src/pages/SettingsPage.tsx
import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PlusCircle, Trash2, Edit, Save, X } from 'lucide-react';
import { toast } from 'sonner';

import {
  CourseItem,
  PlatformItem,
  PlanSpecificDetails,
  PlanContent,
  AllPlansContent,
  initialConfig // <-- Importamos aqui!
} from '@/config/planConfig'; // Certifique-se de que o caminho está correto!

const SettingsPage = () => {
  const [currentConfig, setCurrentConfig] = useState<AllPlansContent>(initialConfig);
  const [selectedPlan, setSelectedPlan] = useState<keyof AllPlansContent>('Escola Básica');

  const [editingCourseId, setEditingCourseId] = useState<string | null>(null);
  const [editingPlatformId, setEditingPlatformId] = useState<string | null>(null);
  const [editingFeatureIndex, setEditingFeatureIndex] = useState<number | null>(null);
  const [editingTipIndex, setEditingTipIndex] = useState<number | null>(null);
  const [editingDetailField, setEditingDetailField] = useState<string | null>(null);


  useEffect(() => {
    fetch('/api/settings').then(res => res.json()).then(data => setCurrentConfig(data));
  }, []);

  const handleSaveConfig = () => {
      fetch('/api/settings', { method: 'POST', body: JSON.stringify(currentConfig) });
    console.log("Configurações salvas:", currentConfig);
    toast.success('Configurações salvas com sucesso!');
  };

  // Funções de CRUD para Detalhes do Plano
  const updatePlanDetail = (field: keyof PlanSpecificDetails, value: string | number | string[]) => {
    setCurrentConfig((prev) => ({
      ...prev,
      [selectedPlan]: {
        ...prev[selectedPlan],
        details: {
          ...prev[selectedPlan].details,
          [field]: value,
        },
      },
    }));
  };

  // Funções de CRUD para Itens de 'additionalFeatures' (agora como lista de strings)
  const addAdditionalFeature = () => {
    setCurrentConfig((prev) => ({
      ...prev,
      [selectedPlan]: {
        ...prev[selectedPlan],
        details: {
          ...prev[selectedPlan].details,
          additionalFeatures: [...prev[selectedPlan].details.additionalFeatures, ''],
        },
      },
    }));
    // Certifique-se de que o índice é o correto para o novo item
    setEditingFeatureIndex(currentConfig[selectedPlan].details.additionalFeatures.length);
    setEditingDetailField('additionalFeatures'); // Define o campo que está sendo editado
  };

  const updateAdditionalFeature = (index: number, value: string) => {
    setCurrentConfig((prev) => ({
      ...prev,
      [selectedPlan]: {
        ...prev[selectedPlan],
        details: {
          ...prev[selectedPlan].details,
          additionalFeatures: prev[selectedPlan].details.additionalFeatures.map((feature, i) =>
            i === index ? value : feature
          ),
        },
      },
    }));
  };

  const deleteAdditionalFeature = (index: number) => {
    setCurrentConfig((prev) => ({
      ...prev,
      [selectedPlan]: {
        ...prev[selectedPlan],
        details: {
          ...prev[selectedPlan].details,
          additionalFeatures: prev[selectedPlan].details.additionalFeatures.filter((_, i) => i !== index),
        },
      },
    }));
    toast.info('Recurso adicional removido.');
    setEditingFeatureIndex(null); // Resetar edição
    setEditingDetailField(null); // Resetar edição
  };

  // Funções de CRUD para Itens de 'integrations' (agora como lista de strings)
  const addIntegration = () => {
    setCurrentConfig((prev) => ({
      ...prev,
      [selectedPlan]: {
        ...prev[selectedPlan],
        details: {
          ...prev[selectedPlan].details,
          integrations: [...(prev[selectedPlan].details.integrations || []), ''], // Garante que é um array
        },
      },
    }));
    // Certifique-se de que o índice é o correto para o novo item
    setEditingFeatureIndex((currentConfig[selectedPlan].details.integrations || []).length);
    setEditingDetailField('integrations'); // Define o campo que está sendo editado
  };

  const updateIntegration = (index: number, value: string) => {
    setCurrentConfig((prev) => ({
      ...prev,
      [selectedPlan]: {
        ...prev[selectedPlan],
        details: {
          ...prev[selectedPlan].details,
          integrations: (prev[selectedPlan].details.integrations || []).map((integration, i) =>
            i === index ? value : integration
          ),
        },
      },
    }));
  };

  const deleteIntegration = (index: number) => {
    setCurrentConfig((prev) => ({
      ...prev,
      [selectedPlan]: {
        ...prev[selectedPlan],
        details: {
          ...prev[selectedPlan].details,
          integrations: (prev[selectedPlan].details.integrations || []).filter((_, i) => i !== index),
        },
      },
    }));
    toast.info('Integração removida.');
    setEditingFeatureIndex(null); // Resetar edição
    setEditingDetailField(null); // Resetar edição
  };

  // Funções de CRUD para Cursos
  const addCourse = () => {
    const newCourse: CourseItem = {
      id: `new-${Date.now()}`,
      title: '',
      description: '',
      tags: [],
      icon: '',
    };
    setCurrentConfig((prev) => ({
      ...prev,
      [selectedPlan]: {
        ...prev[selectedPlan],
        courses: [...prev[selectedPlan].courses, newCourse],
      },
    }));
    setEditingCourseId(newCourse.id);
  };

  const updateCourse = (id: string, field: keyof CourseItem, value: string | string[]) => {
    setCurrentConfig((prev) => ({
      ...prev,
      [selectedPlan]: {
        ...prev[selectedPlan],
        courses: prev[selectedPlan].courses.map((course) =>
          course.id === id ? { ...course, [field]: value } : course
        ),
      },
    }));
  };

  const deleteCourse = (id: string) => {
    setCurrentConfig((prev) => ({
      ...prev,
      [selectedPlan]: {
        ...prev[selectedPlan],
        courses: prev[selectedPlan].courses.filter((course) => course.id !== id),
      },
    }));
    toast.info('Curso removido.');
    setEditingCourseId(null); // Resetar edição
  };

  // Funções de CRUD para Plataformas
  const addPlatform = () => {
    const newPlatform: PlatformItem = {
      id: `new-plat-${Date.now()}`,
      name: '',
      description: '',
      link: '',
      icon: '',
    };
    setCurrentConfig((prev) => ({
      ...prev,
      [selectedPlan]: {
        ...prev[selectedPlan],
        investmentPlatforms: [...prev[selectedPlan].investmentPlatforms, newPlatform],
      },
    }));
    setEditingPlatformId(newPlatform.id);
  };

  const updatePlatform = (id: string, field: keyof PlatformItem, value: string) => {
    setCurrentConfig((prev) => ({
      ...prev,
      [selectedPlan]: {
        ...prev[selectedPlan],
        investmentPlatforms: prev[selectedPlan].investmentPlatforms.map((platform) =>
          platform.id === id ? { ...platform, [field]: value } : platform
        ),
      },
    }));
  };

  const deletePlatform = (id: string) => {
    setCurrentConfig((prev) => ({
      ...prev,
      [selectedPlan]: {
        ...prev[selectedPlan],
        investmentPlatforms: prev[selectedPlan].investmentPlatforms.filter((platform) => platform.id !== id),
      },
    }));
    toast.info('Plataforma removida.');
    setEditingPlatformId(null); // Resetar edição
  };

  // Funções de CRUD para Dicas
  const addTip = () => {
    setCurrentConfig((prev) => ({
      ...prev,
      [selectedPlan]: {
        ...prev[selectedPlan],
        tips: [...prev[selectedPlan].tips, ''],
      },
    }));
    setEditingTipIndex(currentConfig[selectedPlan].tips.length);
  };

  const updateTip = (index: number, value: string) => {
    setCurrentConfig((prev) => ({
      ...prev,
      [selectedPlan]: {
        ...prev[selectedPlan],
        tips: prev[selectedPlan].tips.map((tip, i) =>
          i === index ? value : tip
        ),
      },
    }));
  };

  const deleteTip = (index: number) => {
    setCurrentConfig((prev) => ({
      ...prev,
      [selectedPlan]: {
        ...prev[selectedPlan],
        tips: prev[selectedPlan].tips.filter((_, i) => i !== index),
      },
    }));
    toast.info('Dica removida.');
    setEditingTipIndex(null); // Resetar edição
  };

  const currentPlanDetails = currentConfig[selectedPlan].details;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation/>

      <div className="pt-20 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-[#1A247E] mb-2">
                Configurações de Planos e Conteúdo
              </CardTitle>
              <CardDescription className="text-gray-600">
                Gerencie cursos, plataformas, recursos e dicas para cada plano de assinatura.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <Label htmlFor="plan-select" className="text-lg font-semibold">
                  Selecionar Plano:
                </Label>
                <select
                  id="plan-select"
                  className="mt-2 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-[#1A247E] focus:border-[#1A247E] sm:text-sm rounded-md"
                  value={selectedPlan}
                  onChange={(e) => setSelectedPlan(e.target.value as keyof AllPlansContent)}
                  aria-label="Selecionar Plano"
                >
                  {Object.keys(currentConfig).map((planKey) => (
                    <option key={planKey} value={planKey}>
                      {planKey}
                    </option>
                  ))}
                </select>
              </div>

              <Tabs defaultValue="details" className="space-y-6">
                <TabsList className="grid w-full grid-cols-4 lg:grid-cols-4">
                  <TabsTrigger value="details">Detalhes do Plano</TabsTrigger>
                  <TabsTrigger value="courses">Cursos</TabsTrigger>
                  <TabsTrigger value="platforms">Plataformas</TabsTrigger>
                  <TabsTrigger value="tips">Dicas</TabsTrigger>
                </TabsList>

                {/* Aba de Detalhes do Plano */}
                <TabsContent value="details" className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-800">Detalhes do Plano {selectedPlan}</h3>
                  <Card className="p-4 shadow-sm space-y-4">
                    <div>
                      <Label htmlFor="plan-description">Descrição do Plano</Label>
                      {editingDetailField === 'description' ? (
                        <div className="flex gap-2">
                          <Textarea
                            id="plan-description"
                            value={currentPlanDetails.description}
                            onChange={(e) => updatePlanDetail('description', e.target.value)}
                          />
                          <Button variant="ghost" size="icon" onClick={() => setEditingDetailField(null)}><Save className="w-5 h-5 text-green-600" /></Button>
                        </div>
                      ) : (
                        <div className="flex justify-between items-center">
                          <p className="text-gray-700">{currentPlanDetails.description}</p>
                          <Button variant="ghost" size="icon" onClick={() => setEditingDetailField('description')}><Edit className="w-5 h-5 text-blue-500" /></Button>
                        </div>
                      )}
                    </div>

                    {selectedPlan !== 'Rede de Ensino' && (
                      <div>
                        <Label htmlFor="max-students">Máximo de Alunos</Label>
                        {editingDetailField === 'maxStudents' ? (
                          <div className="flex gap-2">
                            <Input
                              id="max-students"
                              type="number"
                              value={currentPlanDetails.maxStudents || ''}
                              onChange={(e) => updatePlanDetail('maxStudents', parseInt(e.target.value))}
                            />
                            <Button variant="ghost" size="icon" onClick={() => setEditingDetailField(null)}><Save className="w-5 h-5 text-green-600" /></Button>
                          </div>
                        ) : (
                          <div className="flex justify-between items-center">
                            <p className="text-gray-700">{currentPlanDetails.maxStudents || 'Não especificado'}</p>
                            <Button variant="ghost" size="icon" onClick={() => setEditingDetailField('maxStudents')}><Edit className="w-5 h-5 text-blue-500" /></Button>
                          </div>
                        )}
                      </div>
                    )}

                    {selectedPlan === 'Rede de Ensino' && (
                      <div>
                        <Label htmlFor="min-students">Mínimo de Alunos</Label>
                        {editingDetailField === 'minStudents' ? (
                          <div className="flex gap-2">
                            <Input
                              id="min-students"
                              type="number"
                              value={currentPlanDetails.minStudents || ''}
                              onChange={(e) => updatePlanDetail('minStudents', parseInt(e.target.value))}
                            />
                            <Button variant="ghost" size="icon" onClick={() => setEditingDetailField(null)}><Save className="w-5 h-5 text-green-600" /></Button>
                          </div>
                        ) : (
                          <div className="flex justify-between items-center">
                            <p className="text-gray-700">{currentPlanDetails.minStudents || 'Não especificado'}</p>
                            <Button variant="ghost" size="icon" onClick={() => setEditingDetailField('minStudents')}><Edit className="w-5 h-5 text-blue-500" /></Button>
                          </div>
                        )}
                      </div>
                    )}

                    {selectedPlan === 'Escola Premium' && (
                      <div>
                        <Label htmlFor="teacher-training-spots">Vagas para Treinamento de Professores</Label>
                        {editingDetailField === 'teacherTrainingSpots' ? (
                          <div className="flex gap-2">
                            <Input
                              id="teacher-training-spots"
                              type="number"
                              value={currentPlanDetails.teacherTrainingSpots || ''}
                              onChange={(e) => updatePlanDetail('teacherTrainingSpots', parseInt(e.target.value))}
                            />
                            <Button variant="ghost" size="icon" onClick={() => setEditingDetailField(null)}><Save className="w-5 h-5 text-green-600" /></Button>
                          </div>
                        ) : (
                          <div className="flex justify-between items-center">
                            <p className="text-gray-700">{currentPlanDetails.teacherTrainingSpots || 'Não especificado'}</p>
                            <Button variant="ghost" size="icon" onClick={() => setEditingDetailField('teacherTrainingSpots')}><Edit className="w-5 h-5 text-blue-500" /></Button>
                          </div>
                        )}
                      </div>
                    )}

                    <div>
                      <Label htmlFor="access-duration">Duração do Acesso</Label>
                      {editingDetailField === 'accessDuration' ? (
                        <div className="flex gap-2">
                          <Input
                            id="access-duration"
                            value={currentPlanDetails.accessDuration || ''}
                            onChange={(e) => updatePlanDetail('accessDuration', e.target.value)}
                          />
                          <Button variant="ghost" size="icon" onClick={() => setEditingDetailField(null)}><Save className="w-5 h-5 text-green-600" /></Button>
                        </div>
                      ) : (
                        <div className="flex justify-between items-center">
                          <p className="text-gray-700">{currentPlanDetails.accessDuration || 'Não especificado'}</p>
                          <Button variant="ghost" size="icon" onClick={() => setEditingDetailField('accessDuration')}><Edit className="w-5 h-5 text-blue-500" /></Button>
                        </div>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="support-level">Nível de Suporte</Label>
                      {editingDetailField === 'supportLevel' ? (
                        <div className="flex gap-2">
                          <Input
                            id="support-level"
                            value={currentPlanDetails.supportLevel || ''}
                            onChange={(e) => updatePlanDetail('supportLevel', e.target.value)}
                          />
                          <Button variant="ghost" size="icon" onClick={() => setEditingDetailField(null)}><Save className="w-5 h-5 text-green-600" /></Button>
                        </div>
                      ) : (
                        <div className="flex justify-between items-center">
                          <p className="text-gray-700">{currentPlanDetails.supportLevel || 'Não especificado'}</p>
                          <Button variant="ghost" size="icon" onClick={() => setEditingDetailField('supportLevel')}><Edit className="w-5 h-5 text-blue-500" /></Button>
                        </div>
                      )}
                    </div>
                  </Card>

                  {/* Recursos Adicionais do Plano */}
                  <h4 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Recursos Adicionais:</h4>
                  {currentPlanDetails.additionalFeatures.length === 0 && (
                    <p className="text-gray-500">Nenhum recurso adicional cadastrado para este plano.</p>
                  )}
                  {currentPlanDetails.additionalFeatures.map((feature, index) => (
                    <Card key={`feat-${index}`} className="p-4 flex items-center justify-between shadow-sm mb-2">
                      {editingFeatureIndex === index && editingDetailField === 'additionalFeatures' ? (
                        <div className="flex-grow flex items-center gap-2">
                          <Input
                            value={feature}
                            onChange={(e) => updateAdditionalFeature(index, e.target.value)}
                          />
                          <Button variant="ghost" size="icon" onClick={() => { setEditingFeatureIndex(null); setEditingDetailField(null); }}><X className="w-5 h-5 text-red-500" /></Button>
                          <Button variant="ghost" size="icon" onClick={() => { setEditingFeatureIndex(null); setEditingDetailField(null); }}><Save className="w-5 h-5 text-green-600" /></Button>
                        </div>
                      ) : (
                        <p className="flex-grow text-gray-700">{feature}</p>
                      )}
                      <div className="flex space-x-2 ml-4">
                        <Button variant="ghost" size="icon" onClick={() => { setEditingFeatureIndex(index); setEditingDetailField('additionalFeatures'); }}><Edit className="w-5 h-5 text-blue-500" /></Button>
                        <Button variant="ghost" size="icon" onClick={() => deleteAdditionalFeature(index)}><Trash2 className="w-5 h-5 text-red-500" /></Button>
                      </div>
                    </Card>
                  ))}
                  <Button onClick={addAdditionalFeature} className="w-full bg-[#1A247E] hover:bg-[#2D4DE0] mt-2">
                    <PlusCircle className="mr-2" size={16} /> Adicionar Recurso Adicional
                  </Button>

                  {/* Integrações (apenas para Rede de Ensino) */}
                  {selectedPlan === 'Rede de Ensino' && (
                    <>
                      <h4 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Integrações:</h4>
                      {(currentPlanDetails.integrations || []).length === 0 && (
                        <p className="text-gray-500">Nenhuma integração cadastrada para este plano.</p>
                      )}
                      {(currentPlanDetails.integrations || []).map((integration, index) => (
                        <Card key={`int-${index}`} className="p-4 flex items-center justify-between shadow-sm mb-2">
                          {editingFeatureIndex === index && editingDetailField === 'integrations' ? (
                            <div className="flex-grow flex items-center gap-2">
                              <Input
                                value={integration}
                                onChange={(e) => updateIntegration(index, e.target.value)}
                              />
                              <Button variant="ghost" size="icon" onClick={() => { setEditingFeatureIndex(null); setEditingDetailField(null); }}><X className="w-5 h-5 text-red-500" /></Button>
                              <Button variant="ghost" size="icon" onClick={() => { setEditingFeatureIndex(null); setEditingDetailField(null); }}><Save className="w-5 h-5 text-green-600" /></Button>
                            </div>
                          ) : (
                            <p className="flex-grow text-gray-700">{integration}</p>
                          )}
                          <div className="flex space-x-2 ml-4">
                            <Button variant="ghost" size="icon" onClick={() => { setEditingFeatureIndex(index); setEditingDetailField('integrations'); }}><Edit className="w-5 h-5 text-blue-500" /></Button>
                            <Button variant="ghost" size="icon" onClick={() => deleteIntegration(index)}><Trash2 className="w-5 h-5 text-red-500" /></Button>
                          </div>
                        </Card>
                      ))}
                      <Button onClick={addIntegration} className="w-full bg-[#1A247E] hover:bg-[#2D4DE0] mt-2">
                        <PlusCircle className="mr-2" size={16} /> Adicionar Integração
                      </Button>
                    </>
                  )}
                </TabsContent>

                {/* Aba de Cursos */}
                <TabsContent value="courses" className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-800">Cursos do Plano {selectedPlan}</h3>
                  {currentConfig[selectedPlan].courses.length === 0 && (
                    <p className="text-gray-500">Nenhum curso cadastrado para este plano.</p>
                  )}
                  {currentConfig[selectedPlan].courses.map((course) => (
                    <Card key={course.id} className="p-4 shadow-sm">
                      {editingCourseId === course.id ? (
                        <div className="space-y-3">
                          <div>
                            <Label htmlFor={`course-title-${course.id}`}>Título</Label>
                            <Input
                              id={`course-title-${course.id}`}
                              value={course.title}
                              onChange={(e) => updateCourse(course.id, 'title', e.target.value)}
                            />
                          </div>
                          <div>
                            <Label htmlFor={`course-description-${course.id}`}>Descrição</Label>
                            <Textarea
                              id={`course-description-${course.id}`}
                              value={course.description}
                              onChange={(e) => updateCourse(course.id, 'description', e.target.value)}
                            />
                          </div>
                          <div>
                            <Label htmlFor={`course-icon-${course.id}`}>Ícone (Nome Lucide-React)</Label>
                            <Input
                              id={`course-icon-${course.id}`}
                              value={course.icon || ''}
                              onChange={(e) => updateCourse(course.id, 'icon', e.target.value)}
                            />
                          </div>
                          <div>
                            <Label htmlFor={`course-tags-${course.id}`}>Tags (separadas por vírgula)</Label>
                            <Input
                              id={`course-tags-${course.id}`}
                              value={course.tags.join(', ')}
                              onChange={(e) => updateCourse(course.id, 'tags', e.target.value.split(',').map(tag => tag.trim()))}
                            />
                          </div>
                          <div className="flex justify-end space-x-2">
                            <Button variant="ghost" size="icon" onClick={() => setEditingCourseId(null)}><X className="w-5 h-5 text-red-500" /></Button>
                            <Button variant="ghost" size="icon" onClick={() => setEditingCourseId(null)}><Save className="w-5 h-5 text-green-600" /></Button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-lg font-semibold">{course.title}</p>
                            <p className="text-sm text-gray-600">{course.description}</p>
                            {course.icon && <p className="text-xs text-gray-500 mt-1">Ícone: {course.icon}</p>}
                            {course.tags.length > 0 && (
                              <p className="text-xs text-gray-500 mt-1">Tags: {course.tags.join(', ')}</p>
                            )}
                          </div>
                          <div className="flex space-x-2 ml-4">
                            <Button variant="ghost" size="icon" onClick={() => setEditingCourseId(course.id)}><Edit className="w-5 h-5 text-blue-500" /></Button>
                            <Button variant="ghost" size="icon" onClick={() => deleteCourse(course.id)}><Trash2 className="w-5 h-5 text-red-500" /></Button>
                          </div>
                        </div>
                      )}
                    </Card>
                  ))}
                  <Button onClick={addCourse} className="w-full bg-[#1A247E] hover:bg-[#2D4DE0] mt-2">
                    <PlusCircle className="mr-2" size={16} /> Adicionar Curso
                  </Button>
                </TabsContent>

                {/* Aba de Plataformas */}
                <TabsContent value="platforms" className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-800">Plataformas de Investimento do Plano {selectedPlan}</h3>
                  {currentConfig[selectedPlan].investmentPlatforms.length === 0 && (
                    <p className="text-gray-500">Nenhuma plataforma de investimento cadastrada para este plano.</p>
                  )}
                  {currentConfig[selectedPlan].investmentPlatforms.map((platform) => (
                    <Card key={platform.id} className="p-4 shadow-sm">
                      {editingPlatformId === platform.id ? (
                        <div className="space-y-3">
                          <div>
                            <Label htmlFor={`platform-name-${platform.id}`}>Nome</Label>
                            <Input
                              id={`platform-name-${platform.id}`}
                              value={platform.name}
                              onChange={(e) => updatePlatform(platform.id, 'name', e.target.value)}
                            />
                          </div>
                          <div>
                            <Label htmlFor={`platform-description-${platform.id}`}>Descrição</Label>
                            <Textarea
                              id={`platform-description-${platform.id}`}
                              value={platform.description}
                              onChange={(e) => updatePlatform(platform.id, 'description', e.target.value)}
                            />
                          </div>
                          <div>
                            <Label htmlFor={`platform-link-${platform.id}`}>Link</Label>
                            <Input
                              id={`platform-link-${platform.id}`}
                              value={platform.link}
                              onChange={(e) => updatePlatform(platform.id, 'link', e.target.value)}
                            />
                          </div>
                          <div>
                            <Label htmlFor={`platform-icon-${platform.id}`}>Ícone (Nome Lucide-React)</Label>
                            <Input
                              id={`platform-icon-${platform.id}`}
                              value={platform.icon || ''}
                              onChange={(e) => updatePlatform(platform.id, 'icon', e.target.value)}
                            />
                          </div>
                          <div className="flex justify-end space-x-2">
                            <Button variant="ghost" size="icon" onClick={() => setEditingPlatformId(null)}><X className="w-5 h-5 text-red-500" /></Button>
                            <Button variant="ghost" size="icon" onClick={() => setEditingPlatformId(null)}><Save className="w-5 h-5 text-green-600" /></Button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-lg font-semibold">{platform.name}</p>
                            <p className="text-sm text-gray-600">{platform.description}</p>
                            <p className="text-sm text-gray-600">Link: <a href={platform.link} target="_blank" rel="noopener noreferrer" className="text-[#1A247E] hover:underline">{platform.link}</a></p>
                            {platform.icon && <p className="text-xs text-gray-500 mt-1">Ícone: {platform.icon}</p>}
                          </div>
                          <div className="flex space-x-2 ml-4">
                            <Button variant="ghost" size="icon" onClick={() => setEditingPlatformId(platform.id)}><Edit className="w-5 h-5 text-blue-500" /></Button>
                            <Button variant="ghost" size="icon" onClick={() => deletePlatform(platform.id)}><Trash2 className="w-5 h-5 text-red-500" /></Button>
                          </div>
                        </div>
                      )}
                    </Card>
                  ))}
                  <Button onClick={addPlatform} className="w-full bg-[#1A247E] hover:bg-[#2D4DE0] mt-2">
                    <PlusCircle className="mr-2" size={16} /> Adicionar Plataforma
                  </Button>
                </TabsContent>

                {/* Aba de Dicas */}
                <TabsContent value="tips" className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-800">Dicas do Plano {selectedPlan}</h3>
                  {currentConfig[selectedPlan].tips.length === 0 && (
                    <p className="text-gray-500">Nenhuma dica cadastrada para este plano.</p>
                  )}
                  {currentConfig[selectedPlan].tips.map((tip, index) => (
                    <Card key={`tip-${index}`} className="p-4 flex items-center justify-between shadow-sm mb-2">
                      {editingTipIndex === index ? (
                        <div className="flex-grow flex items-center gap-2">
                          <Input
                            value={tip}
                            onChange={(e) => updateTip(index, e.target.value)}
                          />
                          <Button variant="ghost" size="icon" onClick={() => setEditingTipIndex(null)}><X className="w-5 h-5 text-red-500" /></Button>
                          <Button variant="ghost" size="icon" onClick={() => setEditingTipIndex(null)}><Save className="w-5 h-5 text-green-600" /></Button>
                        </div>
                      ) : (
                        <p className="flex-grow text-gray-700">{tip}</p>
                      )}
                      <div className="flex space-x-2 ml-4">
                        <Button variant="ghost" size="icon" onClick={() => setEditingTipIndex(index)}><Edit className="w-5 h-5 text-blue-500" /></Button>
                        <Button variant="ghost" size="icon" onClick={() => deleteTip(index)}><Trash2 className="w-5 h-5 text-red-500" /></Button>
                      </div>
                    </Card>
                  ))}
                  <Button onClick={addTip} className="w-full bg-[#1A247E] hover:bg-[#2D4DE0] mt-2">
                    <PlusCircle className="mr-2" size={16} /> Adicionar Dica
                  </Button>
                </TabsContent>
              </Tabs>

              <div className="mt-8 flex justify-end">
                <Button onClick={handleSaveConfig} className="bg-[#1A247E] hover:bg-[#2D4DE0] text-white font-bold py-2 px-4 rounded-lg shadow-md">
                  Salvar Configurações
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;