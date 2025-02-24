import MainSection from '@/app/(user)/[channel]/MainSection';
import { ScrollArea } from '@/components/ui/scroll-area';

const ChannelPage = ({ params }: { params: { channel: string } }) => {
    return (
        <ScrollArea className="h-[calc(100vh-72px)]">
            <MainSection uniqueName={decodeURIComponent(params.channel)} />
        </ScrollArea>
    );
};

export default ChannelPage;
