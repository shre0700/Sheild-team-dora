import React from 'react';
import { CheckCircle2, Clock, XCircle, ChevronDown } from 'lucide-react';
import { useUser } from '@/context/UserContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const ProfileCard: React.FC = () => {
  const { currentUser, allUsers, setCurrentUser } = useUser();

  const getStatusBadge = () => {
    switch (currentUser.verificationStatus) {
      case 'completed':
        return (
          <div className="flex items-center gap-2 bg-success/10 text-success px-4 py-2 rounded-full">
            <CheckCircle2 className="h-5 w-5" />
            <span className="font-medium">Verified</span>
          </div>
        );
      case 'rejected':
        return (
          <div className="flex items-center gap-2 bg-destructive/10 text-destructive px-4 py-2 rounded-full">
            <XCircle className="h-5 w-5" />
            <span className="font-medium">Rejected</span>
          </div>
        );
      default:
        return (
          <div className="flex items-center gap-2 bg-warning/10 text-warning px-4 py-2 rounded-full">
            <Clock className="h-5 w-5" />
            <span className="font-medium">Pending</span>
          </div>
        );
    }
  };

  return (
    <div className="bg-card rounded-2xl shadow-card p-10 animate-slide-up w-full">
      <DropdownMenu>
        <DropdownMenuTrigger className="w-full focus:outline-none">
          <div className="flex items-center gap-10 cursor-pointer hover:opacity-95 transition w-full min-h-[200px]">

            {/* PROFILE IMAGE */}
            <div className="relative shrink-0">
              <img
                src={currentUser.photo}
                alt={currentUser.name}
                className="w-52 h-52 rounded-2xl object-cover ring-4 ring-primary/20"
              />
              {currentUser.verificationStatus === 'completed' && (
                <div className="absolute -bottom-2 -right-2 bg-success rounded-full p-1.5">
                  <CheckCircle2 className="h-6 w-6 text-success-foreground" />
                </div>
              )}
            </div>

            {/* USER INFO */}
            <div className="flex-1 text-left space-y-3">
              <div className="flex items-center gap-3">
                <h2 className="text-3xl font-bold text-card-foreground">
                  {currentUser.name}
                </h2>
                <ChevronDown className="h-5 w-5 text-muted-foreground" />
              </div>

              <p className="text-muted-foreground text-xl">
                Gig Worker • India
              </p>

              <p className="text-xl text-muted-foreground">
                {currentUser.phone}
              </p>

              <p className="text-xl font-mono text-muted-foreground">
                GID: <span className="font-semibold text-foreground">{currentUser.gid}</span>
              </p>
            </div>

            {/* STATUS BADGE */}
            <div className="ml-auto self-start">
              {getStatusBadge()}
            </div>

          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="start" className="w-72">
          <p className="px-2 py-1.5 text-xs text-muted-foreground font-medium">
            Switch Demo User
          </p>

          {allUsers.map((user) => (
            <DropdownMenuItem
              key={user.id}
              onClick={() => setCurrentUser(user)}
              className="flex items-center gap-3 p-3 cursor-pointer"
            >
              <img
                src={user.photo}
                alt={user.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex-1">
                <p className="font-medium text-sm">{user.name}</p>
                <p className="text-xs text-muted-foreground capitalize">
                  {user.verificationStatus.replace('_', ' ')}
                </p>
              </div>
              {user.id === currentUser.id && (
                <CheckCircle2 className="h-4 w-4 text-success" />
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ProfileCard;
