import styled from "styled-components";
import { Tooltip } from "../../tooltip";
import { useChatContext } from "../context/chatContext";
import { ReactComponent as BoldIcon } from "../../../assets/icons/bold-fill.svg";
import { ReactComponent as ItalicIcon } from "../../../assets/icons/italic-fill.svg";
import { ReactComponent as H1Icon } from "../../../assets/icons/h1-fill.svg";
import { ReactComponent as H2Icon } from "../../../assets/icons/h2-fill.svg";
import { ReactComponent as H3Icon } from "../../../assets/icons/h3-fill.svg";
import { ReactComponent as StrikeIcon } from "../../../assets/icons/strike-fill.svg";
import { ReactComponent as HighlightIcon } from "../../../assets/icons/highlight-fill.svg";
import { ReactComponent as AlignLeftIcon } from "../../../assets/icons/align-left-fill.svg";
import { ReactComponent as AlignCenterIcon } from "../../../assets/icons/align-center-fill.svg";
import { ReactComponent as AlignRightIcon } from "../../../assets/icons/align-right-fill.svg";
import { ReactComponent as AlignJustifyIcon } from "../../../assets/icons/align-justify-fill.svg";
import { ReactComponent as MentionIcon } from "../../../assets/icons/mention-fill.svg";
import { ReactComponent as QuoteIcon } from "../../../assets/icons/quote-fill.svg";
import { IconButton } from "../../buttons/icon-button";

const StyledIconButton = styled(IconButton)`
    border-radius: ${({ theme }) => theme.borderRadii.md};
`;

const StyledTooltip = styled(Tooltip)``;

const MenuContainer = styled.div`
    padding: ${({ theme }) => theme.space.xxs} 0;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
`;

const CommentBar = () => {
    const { editor } = useChatContext();

    if (!editor) {
        return null
    }

    return (
        <MenuContainer>
            <StyledTooltip
                content="Add heading h1"
                placement="top"
                type="light"
                size="small"
            >
                <StyledIconButton onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}>
                    <H1Icon />
                </StyledIconButton>
            </StyledTooltip>
            <StyledTooltip
                content="Add heading h2"
                placement="top"
                type="light"
                size="small"
            >
                <StyledIconButton onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}>
                    <H2Icon />
                </StyledIconButton>
            </StyledTooltip>
            <StyledTooltip
                content="Add heading h3"
                placement="top"
                type="light"
                size="small"
            >
                <StyledIconButton onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}>
                    <H3Icon />
                </StyledIconButton>
            </StyledTooltip>
            <StyledTooltip
                content="Bold text"
                placement="top"
                type="light"
                size="small"
            >
                <StyledIconButton onClick={() => editor.chain().focus().toggleBold().run()} className={editor.isActive('bold') ? 'is-active' : ''}>
                    <BoldIcon />
                </StyledIconButton>
            </StyledTooltip>
            <StyledTooltip
                content="Italic text"
                placement="top"
                type="light"
                size="small"
            >
                <StyledIconButton onClick={() => editor.chain().focus().toggleItalic().run()} className={editor.isActive('italic') ? 'is-active' : ''}>
                    <ItalicIcon />
                </StyledIconButton>
            </StyledTooltip>
            <StyledTooltip
                content="Strike through text"
                placement="top"
                type="light"
                size="small"
            >
                <StyledIconButton onClick={() => editor.chain().focus().toggleStrike().run()} className={editor.isActive('strike') ? 'is-active' : ''}>
                    <StrikeIcon />
                </StyledIconButton>
            </StyledTooltip>
            <StyledTooltip
                content="Highlight text"
                placement="top"
                type="light"
                size="small"
            >
                <StyledIconButton onClick={() => editor.chain().focus().toggleHighlight().run()} className={editor.isActive('highlight') ? 'is-active' : ''}>
                    <HighlightIcon />
                </StyledIconButton>
            </StyledTooltip>
            <StyledTooltip
                content="Text align left"
                placement="top"
                type="light"
                size="small"
            >
                <StyledIconButton onClick={() => editor.chain().focus().setTextAlign('left').run()} className={editor.isActive({ textAlign: 'left' }) ? 'is-active' : ''}>
                    <AlignLeftIcon />
                </StyledIconButton>
            </StyledTooltip>
            <StyledTooltip
                content="Text align center"
                placement="top"
                type="light"
                size="small"
            >
                <StyledIconButton onClick={() => editor.chain().focus().setTextAlign('center').run()} className={editor.isActive({ textAlign: 'center' }) ? 'is-active' : ''}>
                    <AlignCenterIcon />
                </StyledIconButton>
            </StyledTooltip>
            <StyledTooltip
                content="Text align right"
                placement="top"
                type="light"
                size="small"
            >
                <StyledIconButton onClick={() => editor.chain().focus().setTextAlign('right').run()} className={editor.isActive({ textAlign: 'right' }) ? 'is-active' : ''}>
                    <AlignRightIcon />
                </StyledIconButton>
            </StyledTooltip>
            <StyledTooltip
                content="Text align justify"
                placement="top"
                type="light"
                size="small"
            >
                <StyledIconButton onClick={() => editor.chain().focus().setTextAlign('justify').run()} className={editor.isActive({ textAlign: 'justify' }) ? 'is-active' : ''}>
                    <AlignJustifyIcon />
                </StyledIconButton>
            </StyledTooltip>
            <StyledTooltip
                content="Quote text"
                placement="top"
                type="light"
                size="small"
            >
                <StyledIconButton onClick={() => editor.commands.setBlockquote()} className={editor.isActive('blockquote') ? 'is-active' : ''}>
                    <QuoteIcon />
                </StyledIconButton>
            </StyledTooltip>
            <StyledTooltip
                content="Add a mention"
                placement="top"
                type="light"
                size="small"
            >
                <StyledIconButton onClick={() => editor.commands.insertContent("@")}>
                    <MentionIcon />
                </StyledIconButton>
            </StyledTooltip>
        </MenuContainer>
    )
};

export { CommentBar };