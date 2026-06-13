import React from 'react';
import PropTypes from 'prop-types';
import { ChevronDown, UserPlus } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/shared/components/ui/Tooltip';
import { Button } from '@/shared/components/ui/Button';

/**
 * ServerHeader Component
 * Hiển thị thanh tiêu đề của Server (tên server + nút dropdown + nút mời người)
 * Vị trí: Đỉnh của cột danh sách Channel.
 */
const ServerHeader = ({ serverName, onClickHeader, onClickInvite }) => {
    return (
        // THẺ CHỨA NGOÀI CÙNG: làm layout (đã thêm sticky và shrink-0 để cố định ở trên cùng)
        <div className="w-full h-12 flex items-center justify-between px-4 border-b border-black/10 shrink-0 sticky top-0 z-10 bg-nav-sidebar-bg">

            {/* NÚT BẤM BÊN TRÁI (Tên Server + Mũi tên): Nút Mở Menu */}
            <button
                className="flex items-center min-w-0 flex-1 h-10 px-2 -ml-2 text-left hover:bg-hover-bg transition-colors rounded-md"
                onClick={onClickHeader}
            >
                <h1 className="font-semibold text-[15px] text-primary-text truncate mr-1">
                    {serverName}
                </h1>
                <ChevronDown className="w-4 h-4 text-muted-text flex-shrink-0" />
            </button>

            {/* NÚT BẤM BÊN PHẢI (Mời bạn bè) */}
            <TooltipProvider>
                <Tooltip delayDuration={50}>
                    <TooltipTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="w-8 h-8 rounded-md text-muted-text hover:bg-hover-bg hover:text-primary-text ml-2 [&_svg]:size-5 shrink-0"
                            onClick={onClickInvite}
                        >
                            <UserPlus />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" sideOffset={8}>
                        <p className="font-semibold text-sm">Mời bạn bè</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>

        </div>
    );
};

ServerHeader.propTypes = {
    // Bắt buộc phải truyền text Tên Server vào
    serverName: PropTypes.string.isRequired,
    // Không bắt buộc: Hàm xử lý khi bấm vào khung tiêu đề
    onClickHeader: PropTypes.func,
    // Không bắt buộc: Hàm xử lý khi bấm vào Icon Invite
    onClickInvite: PropTypes.func,
};

export default ServerHeader;
