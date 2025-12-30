// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Button } from '@/components/ui/button';
// import { ShieldCheck, Award, BookOpen, ArrowRight } from 'lucide-react';

// const ActionButtons: React.FC = () => {
//   const navigate = useNavigate();

//   const actions = [
//     {
//       id: 'verify',
//       label: 'Get Verified',
//       description: 'Upload documents & get verified',
//       icon: ShieldCheck,
//       variant: 'action' as const,
//       path: '/get-verified',
//     },
//     {
//       id: 'certify',
//       label: 'Get Certified',
//       description: 'Safety & skill certifications',
//       icon: Award,
//       variant: 'actionSecondary' as const,
//       path: '/get-certified',
//     },
//     {
//       id: 'learn',
//       label: 'Learn More',
//       description: 'How this portal works',
//       icon: BookOpen,
//       variant: 'outline' as const,
//       path: '/learn-more',
//     },
//   ];

//   return (
//     <div className="space-y-4 animate-slide-up" style={{ animationDelay: '0.1s' }}>
//       {actions.map((action, index) => (
//         <Button
//           key={action.id}
//           variant={action.variant}
//           size="xl"
//           className="w-full justify-between group"
//           onClick={() => navigate(action.path)}
//           style={{ animationDelay: `${0.1 + index * 0.1}s` }}
//         >
//           <div className="flex items-center gap-4">
//             <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
//               action.variant === 'outline' 
//                 ? 'bg-primary/10' 
//                 : 'bg-primary-foreground/20'
//             }`}>
//               <action.icon className={`h-7 w-7 ${
//                 action.variant === 'outline' 
//                   ? 'text-primary' 
//                   : 'text-primary-foreground'
//               }`} />
//             </div>
//             <div className="text-left">
//               <span className="block text-lg font-bold">{action.label}</span>
//               <span className={`block text-sm font-normal ${
//                 action.variant === 'outline' 
//                   ? 'text-muted-foreground' 
//                   : 'text-primary-foreground/80'
//               }`}>
//                 {action.description}
//               </span>
//             </div>
//           </div>
//           <ArrowRight className={`h-6 w-6 transition-transform group-hover:translate-x-1 ${
//             action.variant === 'outline' 
//               ? 'text-primary' 
//               : 'text-primary-foreground'
//           }`} />
//         </Button>
//       ))}
      
//       <div className="text-center pt-4 pb-2">
//         <button 
//           onClick={() => navigate('/learn-more')}
//           className="text-primary hover:text-primary/80 underline underline-offset-4 text-sm transition-colors"
//         >
//           Want to know how this portal works? Click here.
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ActionButtons;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShieldCheck, Award, BookOpen, ArrowRight } from 'lucide-react';

const ActionButtons: React.FC = () => {
  const navigate = useNavigate();

  const actions = [
    {
      id: 'verify',
      label: 'Get Verified',
      description: 'Upload documents & get verified',
      icon: ShieldCheck,
      path: '/get-verified',
      bg: 'bg-blue-600 hover:bg-blue-700',
      iconBg: 'bg-blue-100',
      text: 'text-white',
      iconColor: 'text-blue-600',
    },
    {
      id: 'certify',
      label: 'Get Certified',
      description: 'Safety & skill certifications',
      icon: Award,
      path: '/get-certified',
      bg: 'bg-green-600 hover:bg-green-700',
      iconBg: 'bg-green-100',
      text: 'text-white',
      iconColor: 'text-green-600',
    },
    {
      id: 'learn',
      label: 'Learn More',
      description: 'How this portal works',
      icon: BookOpen,
      path: '/learn-more',
      bg: 'bg-amber-500 hover:bg-amber-600',
      iconBg: 'bg-amber-100',
      text: 'text-white',
      iconColor: 'text-amber-600',
    },
  ];

  return (
    <div className="space-y-4 animate-slide-up">
      {actions.map((action, index) => (
        <Button
          key={action.id}
          size="xl"
          className={`w-full justify-between group ${action.bg} ${action.text}`}
          onClick={() => navigate(action.path)}
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className="flex items-center gap-4">
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center ${action.iconBg}`}
            >
              <action.icon className={`h-6 w-6 ${action.iconColor}`} />
            </div>

            <div className="text-left">
              <span className="block text-lg font-bold">
                {action.label}
              </span>
              <span className="block text-sm opacity-90">
                {action.description}
              </span>
            </div>
          </div>

          <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
        </Button>
      ))}

      <div className="text-center pt-4">
        <button
          onClick={() => navigate('/learn-more')}
          className="text-primary hover:text-primary/80 underline underline-offset-4 text-sm"
        >
          Want to know how this portal works? Click here.
        </button>
      </div>
    </div>
  );
};

export default ActionButtons;


