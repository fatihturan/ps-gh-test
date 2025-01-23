import Button from '@/components/button';
import DropdownMenu from '@/components/dropdown-menu';
import { useChatContext } from '@/state';
import { ArrowForward } from '@/icons';

export const Header = () => {
    const {
        loginedUser,
        setInformationBoxOpen,
        informationBoxData,
        informationBoxOpen
    } = useChatContext();

    return (
        <div className="lg:z-3 fixed left-0 top-0 z-10 flex h-[76px] w-full items-center justify-between gap-[16px] px-[24px] py-[22px] lg:px-[24px] lg:py-[22px]">
            <div>
                <img
                    className="h-[32px] w-[100px]"
                    src={
                        new URL('/images/pine-sports-logo.svg', import.meta.url)
                            .href
                    }
                />
            </div>
            <div className="flex items-center gap-[16px]">
                {loginedUser ? (
                    <>
                        <div className="h-[40px] w-[40px] overflow-hidden rounded-[50%] bg-black">
                            <a href="/settings">
                                <img src={window.context.profile_picture} />
                            </a>
                        </div>
                    </>
                ) : (
                    <Button variant="primary">Login</Button>
                )}
                <DropdownMenu />
                {!informationBoxOpen &&
                    informationBoxData &&
                    informationBoxData.length > 0 && (
                        <div
                            onClick={() => setInformationBoxOpen(true)}
                            className="hidden cursor-pointer items-center justify-center rounded-[8px] bg-white-10 px-[16px] py-[8px] lg:flex"
                        >
                            <ArrowForward className="mr-[8px] w-[24px] rotate-180" />
                            <span className="text-[14px] text-white">
                                Betslips
                            </span>
                        </div>
                    )}
            </div>
        </div>
    );
};

export default Header;
