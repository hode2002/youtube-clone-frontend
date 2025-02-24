import { useEffect, useState } from 'react';
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
import { useUserStore } from '@/stores';
import { useToast } from '@/hooks/use-toast';
import { Channel } from '@/types';
import { SubscriptionNotifyType } from '@/types/subscription';
import {
    useAddSubscription,
    useRemoveSubscription,
    useUpdateNotifySubscription,
} from '@/hooks/useFetchSubscriptions';
import { checkSubscription } from '@/apiRequests';

type ChannelCardType = 'detail' | 'simple';

interface ChannelCardProps {
    channel: Channel;
    className?: string;
    type?: ChannelCardType;
    isOwner?: boolean;
    showBtnOnly?: boolean;
}

export default function ChannelCard({
    className,
    channel,
    type = 'detail',
    isOwner = false,
    showBtnOnly = false,
}: ChannelCardProps) {
    const { toast } = useToast();
    const { profile } = useUserStore();
    const [subscribed, setSubscribed] = useState(false);
    const [notificationType, setNotificationType] = useState<SubscriptionNotifyType>('all');
    const [openAlert, setOpenAlert] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const { avatarUrl, subscribersCount, name, _id: channelId } = channel;
    const { mutate: addSubscription } = useAddSubscription();
    const { mutate: removeSubscription } = useRemoveSubscription();
    const { mutate: updateSubsNotificationType } = useUpdateNotifySubscription();

    useEffect(() => {
        (async () => {
            const isSubscribed = await checkSubscription(channelId);
            if (!isSubscribed) return;

            setSubscribed(true);
            setNotificationType(isSubscribed.notificationType);
        })();
    }, []);

    const handleUpdateNotificationType = (type: SubscriptionNotifyType) => {
        setIsLoading(true);
        setNotificationType(type);
        updateSubsNotificationType({ channelId, type });
        setIsLoading(false);
    };

    const handleSubscribed = () => {
        if (!profile) {
            toast({ description: 'Vui lòng đăng nhập để tiếp tục' });
            return;
        }
        setIsLoading(true);
        addSubscription(channelId);
        setSubscribed(true);
        setIsLoading(false);
    };

    const handleUnsubscribed = () => {
        setIsLoading(true);
        removeSubscription(channelId);
        setSubscribed(false);
        setOpenAlert(false);
        setNotificationType('all');
        setIsLoading(false);
    };

    return (
        <div
            className={cn(
                `flex w-full items-center rounded-xl bg-background py-4 text-foreground ${subscribed ? 'md:max-w-sm' : 'md:max-w-xs'}`,
                className,
            )}
        >
            {!showBtnOnly && (
                <>
                    <Avatar>
                        <AvatarImage src={avatarUrl} alt={name} />
                        <AvatarFallback>{name.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>

                    <div className="ml-4 flex flex-grow flex-col">
                        <span className="text-lg font-semibold text-white">{name}</span>
                        {type === 'detail' && (
                            <span className="text-sm text-[#aaa]">
                                {formatNumber({
                                    number: subscribersCount,
                                    suffix: 'người đăng ký',
                                })}
                            </span>
                        )}
                    </div>
                </>
            )}

            {type === 'detail' &&
                (subscribed ? (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="outline"
                                className="flex items-center rounded-3xl text-foreground"
                                disabled={isLoading}
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
                            <DropdownMenuItem onClick={() => handleUpdateNotificationType('all')}>
                                <BellRing size={16} className="mr-2 fill-current" /> Tất cả
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleUpdateNotificationType('none')}>
                                <BellOff size={16} className="mr-2" /> Không nhận thông báo
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setOpenAlert(true)}>
                                <UserMinus size={16} className="mr-2" /> Hủy đăng ký
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                ) : isOwner ? (
                    <Button variant="default" className="my-4 rounded-3xl bg-[#3ea6ff] text-black">
                        Chỉnh sửa video
                    </Button>
                ) : (
                    <Button
                        variant="default"
                        className="rounded-3xl"
                        onClick={handleSubscribed}
                        disabled={isLoading}
                    >
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
