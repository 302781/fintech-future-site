// src/components/CourseContent.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlayCircle } from 'lucide-react';
import React from 'react'; // Importar React para usar React.ReactNode

interface Course {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode; // Ícone para o curso
  tags: string[]; // Tags para categorizar o curso
  link?: string; // Opcional, se cada curso tiver um link direto
}

interface CourseContentProps {
  courses: Course[];
}

const CourseContent = ({ courses }: CourseContentProps) => {
  if (courses.length === 0) {
    return (
      <div className="text-center py-10 text-gray-600">
        <p className="text-lg mb-4">No momento, não há cursos disponíveis para o seu plano ou eles estão em atualização.</p>
        <p>Volte em breve para novidades ou entre em contato para mais informações.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course) => (
        <Card key={course.id} className="hover:shadow-lg transition-all">
          <CardHeader className="flex flex-row items-center space-x-4 pb-2">
            <div className="flex-shrink-0">{course.icon}</div>
            <CardTitle className="text-xl font-bold text-gray-900">{course.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-3 text-sm">{course.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {course.tags.map((tag, idx) => (
                <span key={idx} className="bg-blue-100 text-[#1A247E] text-xs font-medium px-2.5 py-0.5 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
            <Button className="w-full bg-[#1A247E] hover:bg-[#2D4DE0]">
              <PlayCircle className="w-4 h-4 mr-2" />
              Acessar Curso
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CourseContent;