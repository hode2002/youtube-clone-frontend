import { Button } from '@/components/ui/button';
import { formatUploadTime, formatNumber } from '../../../lib/utils';
import { useState } from 'react';
import { Dot } from 'lucide-react';

type VideoDescriptionType = 'show' | 'hide';

interface VideoDescriptionProps {
    views: number;
    uploadTime: string;
    content?: string;
    category: string;
    type?: VideoDescriptionType;
}

export default function VideoDescription({
    views,
    uploadTime,
    content,
    category,
}: VideoDescriptionProps) {
    const [type, setType] = useState<'show' | 'hide'>('hide');

    return (
        <div className="mx-auto max-w-sm rounded-lg p-4 font-semibold shadow-md dark:bg-[#272727] md:max-w-full">
            <div className="flex text-sm">
                {type === 'show' ? (
                    <>
                        {formatNumber({
                            number: views,
                            notation: 'standard',
                            compactDisplay: 'long',
                            suffix: 'lượt xem',
                        })}
                        <Dot />
                        {formatUploadTime(uploadTime, 'detail')}
                    </>
                ) : (
                    <>
                        {formatNumber({ number: views, suffix: 'luợt xem' })}
                        <Dot />
                        {formatUploadTime(uploadTime)}
                    </>
                )}
            </div>
            {type === 'show' && (
                <div className="mt-2">
                    {content ? (
                        <h2 className="text-sm font-semibold">{content}</h2>
                    ) : (
                        <span className="text-sm italic text-gray-500">
                            Video này chưa được thêm nội dung mô tả.
                        </span>
                    )}
                    <p className="mt-4 flex gap-2 text-sm">
                        <span>Thể loại:</span>
                        <span className="capitalize">{category}</span>
                    </p>
                </div>
            )}
            <Button
                variant={'link'}
                onClick={() => setType(type === 'show' ? 'hide' : 'show')}
                className="mt-2 pl-0"
            >
                {type === 'show' ? 'Ẩn bớt' : 'Hiện thêm'}
            </Button>
        </div>
    );
}
