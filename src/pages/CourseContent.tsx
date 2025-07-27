import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge'; 
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react'; 

// Interface para um item de curso, com o ícone agora como uma string (nome do ícone)
interface CourseItem {
  id: string;
  title: string;
  description: string;
  icon?: string; // O ícone agora é o nome do componente Lucide-React como string
  tags: string[];
}

// Props para o componente CourseContent
interface CourseContentProps {
  courses: CourseItem[];
  // IconMap é um objeto que mapeia nomes de string para componentes React.ElementType (componentes de ícone)
  IconMap: { [key: string]: React.ElementType }; 
}

const CourseContent: React.FC<CourseContentProps> = ({ courses, IconMap }) => {
  // Exibe uma mensagem se não houver cursos disponíveis para o plano atual
  if (!courses || courses.length === 0) {
    return (
      <div className="text-center py-10 text-gray-600">
        <p>Nenhum curso disponível no momento para o seu plano.</p>
        <p className="mt-2 text-sm">Verifique as configurações do seu plano ou entre em contato com o suporte.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {courses.map((course) => {
        // Resolve o nome do ícone (string) para o componente React real usando o IconMap
        const IconComponent = course.icon ? IconMap[course.icon] : null; 
        
        return (
          // Card de curso individual
          <Card 
            key={course.id} 
            className="flex flex-col h-full hover:shadow-lg transition-shadow duration-200"
          >
            <CardContent className="flex-grow p-6">
              <div className="flex items-start mb-4">
                {/* Renderiza o ícone dinamicamente se existir */}
                {IconComponent && <IconComponent className="w-8 h-8 text-[#1A247E] mr-3 flex-shrink-0" />}
                <div>
                  {/* Título do curso */}
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{course.title}</h3>
                  {/* Descrição do curso */}
                  <p className="text-sm text-gray-600">{course.description}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                {/* Exibe as tags do curso como Badges */}
                {course.tags.map((tag, idx) => (
                  <Badge key={idx} variant="outline">{tag}</Badge>
                ))}
              </div>
              {/* Link para a página de detalhes do curso */}
              <div className="mt-auto pt-4 text-right">
                <Link 
                  to={`/curso/${course.id}`} 
                  className="inline-flex items-center text-[#1A247E] hover:text-[#2D4DE0] font-medium"
                  // Adicionado aria-label para melhor acessibilidade, descrevendo o destino do link
                  aria-label={`Ver detalhes do curso: ${course.title}`}
                >
                  Detalhes do Curso <ArrowRight className="ml-1 w-4 h-4" />
                </Link>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default CourseContent;
