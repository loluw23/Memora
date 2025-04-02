
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface UserAvatarProps {
  className?: string;
  style?: React.CSSProperties;
}

const UserAvatar = ({ className, style }: UserAvatarProps) => {
  return (
    <Avatar className={className} style={style}>
      <AvatarImage src="https://github.com/shadcn.png" alt="User" />
      <AvatarFallback>JS</AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
