import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge'; 
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react'; 
interface CourseItem {
  id: string;
  title: string;
  description: string;
  icon?: string;
  tags: string[];
}

interface CourseContentProps {
  courses: CourseItem[];
  IconMap: { [key: string]: React.ElementType }; 
}

const CourseContent: React.FC<CourseContentProps> = ({ courses, IconMap }) => {
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
        const IconComponent = course.icon ? IconMap[course.icon] : null; 
        return (
          <Card key={course.id} className="flex flex-col h-full hover:shadow-lg transition-shadow duration-200">
            <CardContent className="flex-grow p-6">
              <div className="flex items-start mb-4">
                {IconComponent && <IconComponent className="w-8 h-8 text-[#1A247E] mr-3 flex-shrink-0" />}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{course.title}</h3>
                  <p className="text-sm text-gray-600">{course.description}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                {course.tags.map((tag, idx) => (
                  <Badge key={idx} variant="outline">{tag}</Badge>
                ))}
              </div>
              <div className="mt-auto pt-4 text-right">
                <Link to={`/curso/${course.id}`} className="inline-flex items-center text-[#1A247E] hover:text-[#2D4DE0] font-medium">
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