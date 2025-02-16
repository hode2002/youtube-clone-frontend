import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
} from '@/components/ui/alert-dialog';
import { BellOff, BellRing, ChevronDown, UserMinus } from 'lucide-react';
import { cn, formatNumber } from '../lib/utils';

type ChannelCardType = 'detail' | 'simple';

interface ChannelCardProps {
    className?: string;
    avatar: string;
    name: string;
    subscribers: number;
    type?: ChannelCardType;
}

export default function ChannelCard({
    className,
    avatar,
    name,
    subscribers,
    type = 'detail',
}: ChannelCardProps) {
    const [subscribed, setSubscribed] = useState(false);
    const [notificationType, setNotificationType] = useState<'all' | 'off'>('all');
    const [openAlert, setOpenAlert] = useState(false);

    const handleSubscribed = () => {
        setSubscribed(true);
    };

    const handleUnsubscribed = () => {
        setSubscribed(false);
        setOpenAlert(false);
        setNotificationType('all');
    };

    return (
        <div
            className={cn(
                `flex w-full items-center rounded-xl bg-background py-4 text-foreground ${subscribed ? 'max-w-sm' : 'max-w-xs'}`,
                className,
            )}
        >
            <Avatar>
                <AvatarImage src={avatar} alt={name} />
                <AvatarFallback>{name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="ml-4 flex flex-grow flex-col">
                <span className="text-lg font-semibold">{name}</span>
                {type === 'detail' && (
                    <span className="text-sm text-gray-500">
                        {formatNumber({ number: subscribers, suffix: 'người đăng ký' })}
                    </span>
                )}
            </div>
            {type === 'detail' &&
                (subscribed ? (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="outline"
                                className="flex items-center rounded-3xl text-foreground"
                            >
                                {notificationType === 'all' ? (
                                    <BellRing className="fill-current" size={16} />
                                ) : (
                                    <BellOff size={16} />
                                )}
                                Đã đăng ký <ChevronDown />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setNotificationType('all')}>
                                <BellRing size={16} className="mr-2 fill-current" /> Tất cả
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setNotificationType('off')}>
                                <BellOff size={16} className="mr-2" /> Không nhận thông báo
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setOpenAlert(true)}>
                                <UserMinus size={16} className="mr-2" /> Hủy đăng ký
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                ) : (
                    <Button variant="default" className="rounded-3xl" onClick={handleSubscribed}>
                        Đăng ký
                    </Button>
                ))}

            <AlertDialog open={openAlert} onOpenChange={setOpenAlert}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogDescription>Hủy đăng ký {name}?</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setOpenAlert(false)}>
                            Hủy
                        </AlertDialogCancel>
                        <AlertDialogAction onClick={handleUnsubscribed}>
                            Hủy đăng ký
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
