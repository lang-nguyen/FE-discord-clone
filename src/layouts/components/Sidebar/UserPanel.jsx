import React from 'react';
import PropTypes from 'prop-types';
import { Mic, MicOff, Headphones, HeadphoneOff, Settings } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/shared/components/ui/Avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/shared/components/ui/Tooltip';
import { Button } from '@/shared/components/ui/Button';

const UserPanel = ({
    user,
    isMuted = false,
    isDeafened = false,
    onToggleMute,
    onToggleDeafen,
    onClickSettings,
    onClickProfile
}) => {
    return (
        // THẺ CHỨA NGOÀI CÙNG (Container)
        <div className="flex items-center justify-between w-full h-[52px] px-2 py-1.5 bg-user-panel-bg shrink-0">

            {/* KHỐI BÊN TRÁI: Avatar + Tên User */}
            <div
                className="flex items-center min-w-0 flex-1 h-full px-1 py-1 -ml-1 rounded-md hover:bg-hover-bg transition-colors cursor-pointer mr-1"
                onClick={onClickProfile}
            >
                {/* Avatar kèm Trạng thái Online - Dùng CSS ghi đè component gốc*/}
                <div className="shrink-0 mr-3 [&_.absolute]:!-bottom-[2px] [&_.absolute]:!-right-[2px] [&_.absolute]:!w-3.5 [&_.absolute]:!h-3.5 [&_.absolute]:!border-[3px] [&_.absolute]:!border-[var(--user-panel-bg)]">
                    <Avatar className="w-8 h-8" status={user?.onlineStatus || "online"}>
                        <AvatarImage src={user?.avatarUrl} alt={user?.username} />
                        <AvatarFallback>{user?.username?.charAt(0)?.toUpperCase() || 'U'}</AvatarFallback>
                    </Avatar>
                </div>

                {/* Tên và Text phụ */}
                <div className="flex flex-col min-w-0 flex-1 leading-tight">
                    <span className="text-primary-text text-sm font-semibold truncate">
                        {user?.username || 'Unknown User'}
                    </span>
                    <span className="text-muted-text text-xs truncate">
                        {user?.statusText || 'Trực tuyến'}
                    </span>
                </div>
            </div>

            {/* KHỐI BÊN PHẢI: 3 Nút bấm (Mic, Tai nghe, Cài đặt) */}
            <div className="flex items-center shrink-0">

                {/* Nút 1: Bật/Tắt Mic */}
                <TooltipProvider>
                    <Tooltip delayDuration={50}>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={onToggleMute}
                                className="w-8 h-8 rounded-md hover:bg-hover-bg text-muted-text hover:text-primary-text shrink-0"
                            >
                                {/* Dùng toán tử 3 ngôi: Nếu isMuted=true thì render con Mic gạch chéo màu đỏ, ngược lại render con Mic bình thường */}
                                {isMuted ? <MicOff className="w-5 h-5 text-red-500" /> : <Mic className="w-5 h-5" />}
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="top" sideOffset={8}>
                            <p className="font-semibold text-sm">{isMuted ? "Bật tham gia thoại" : "Tắt tiếng"}</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>

                {/* Nút 2: Bật/Tắt Tai nghe (Âm thanh) */}
                <TooltipProvider>
                    <Tooltip delayDuration={50}>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={onToggleDeafen}
                                className="w-8 h-8 rounded-md hover:bg-hover-bg text-muted-text hover:text-primary-text shrink-0"
                            >
                                {/* Deafen (Tắt âm) */}
                                {isDeafened ? <HeadphoneOff className="w-5 h-5 text-red-500" /> : <Headphones className="w-5 h-5" />}
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="top" sideOffset={8}>
                            <p className="font-semibold text-sm">{isDeafened ? "Bật âm thanh" : "Tắt âm thanh"}</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>

                {/* Nút 3: Cài đặt User */}
                <TooltipProvider>
                    <Tooltip delayDuration={50}>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={onClickSettings}
                                className="w-8 h-8 rounded-md hover:bg-hover-bg text-muted-text hover:text-primary-text shrink-0"
                            >
                                <Settings className="w-5 h-5" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="top" sideOffset={8}>
                            <p className="font-semibold text-sm">Cài đặt người dùng</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>

            </div>
        </div>
    );
};

UserPanel.propTypes = {
    // Hình mẫu (Shape) của Object user truyền vào
    user: PropTypes.shape({
        username: PropTypes.string,
        statusText: PropTypes.string,
        avatarUrl: PropTypes.string,
        onlineStatus: PropTypes.oneOf(['online', 'idle', 'dnd', 'offline'])
    }).isRequired,

    isMuted: PropTypes.bool,
    isDeafened: PropTypes.bool,

    onToggleMute: PropTypes.func,
    onToggleDeafen: PropTypes.func,
    onClickSettings: PropTypes.func,
    onClickProfile: PropTypes.func
};

export default UserPanel;
