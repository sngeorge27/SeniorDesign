import HeadMetadata from "../components/HeadMetadata";
import Header from "../components/Header";

export default function MainContentLayout({
    tabTitle,
    headerTitle,
    headerSubtitle = null,
    showProfile = true,
    children,
}) {
    return (
        <div className="w-full sm:w-[800px] flex flex-col mx-auto">
            <HeadMetadata title={tabTitle} />
            <Header
                title={headerTitle}
                subtitle={headerSubtitle}
                showProfile={showProfile}
            ></Header>
            {children}
        </div>
    );
}
