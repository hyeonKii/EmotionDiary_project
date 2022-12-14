import { useRecoilValue } from "recoil";

import { showLoginForm } from "@/temp/formAtom";
import Home from "@/components/home/Home";
import PostList from "@/components/home/PostList";
import { Wrapper } from "@/styles/home/page-style";

export default function MainPage() {
    const formState = useRecoilValue(showLoginForm);
    return (
        <Wrapper formState={formState}>
            <Home />
            <PostList />
        </Wrapper>
    );
}
