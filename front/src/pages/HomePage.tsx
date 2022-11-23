import Home from "@/components/home/Home";
import PostList from "@/components/home/PostList";
import { PageBlock } from "@/styles/home/page-style";

export default function MainPage() {
    return (
        <PageBlock>
            <Home />
            <PostList />
        </PageBlock>
    );
}
