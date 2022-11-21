import Main from "@/components/main/Main";
import PostList from "@/components/main/PostList";
import { PageBlock } from "../styles/main/page-style";

export default function MainPage() {
    return (
        <PageBlock>
            <Main />
            <PostList />
        </PageBlock>
    );
}
