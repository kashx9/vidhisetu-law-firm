import * as React from "react";
import { EditorContent, useEditor, useEditorState, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { TableKit } from "@tiptap/extension-table";
import {
  Bold,
  Code,
  Italic,
  Link2,
  Link2Off,
  List,
  ListOrdered,
  Minus,
  Quote,
  Redo2,
  RemoveFormatting,
  SquareCode,
  Strikethrough,
  Table,
  Undo2,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { htmlToMarkdown, markdownToHtml } from "@/lib/richText";

/**
 * ════════════════════════════════════════════════════════════════════════════
 *  RICH-TEXT EDITOR — the Studio's writing surface
 * ════════════════════════════════════════════════════════════════════════════
 *
 *  A word-processor surface over a Markdown document: the writer sees styled
 *  text and clicks a toolbar, while `value` and `onChange` stay Markdown so
 *  nothing downstream of the editor had to change. See src/lib/richText.ts.
 *
 *  The editable area carries `.prose-legal`, the same class the published
 *  article uses, so a heading or a pull-quote looks here exactly as it will
 *  on the live page.
 *
 *  Pasting from Word, Google Docs or a web page keeps the structure —
 *  headings, lists, tables, bold, links — and drops everything Markdown
 *  cannot carry, which is the behaviour we want on save anyway.
 */

/** Paragraph styles, in the order a word processor lists them. */
const styles = [
  { value: "paragraph", label: "Normal text" },
  { value: "h2", label: "Heading 1" },
  { value: "h3", label: "Heading 2" },
  { value: "h4", label: "Heading 3" },
] as const;

export function RichTextEditor({
  value,
  onChange,
  className,
}: {
  value: string;
  onChange: (markdown: string) => void;
  className?: string;
}) {
  /**
   * The Markdown this editor last produced. `value` coming back in unchanged
   * is our own echo and must not reset the document mid-keystroke; `value`
   * arriving different means something else edited it (the Markdown tab, or a
   * post being loaded) and the document does need rebuilding.
   */
  const emitted = React.useRef(value);

  const editor = useEditor({
    // The Studio sits behind a sign-in gate, but keep the editor out of any
    // server render regardless — it needs a real DOM.
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        // Markdown has no underline, and react-markdown does not render raw
        // HTML, so an underline would vanish on save. Better not to offer it.
        underline: false,
        heading: { levels: [2, 3, 4] },
        link: { openOnClick: false, autolink: true, linkOnPaste: true },
      }),
      TableKit.configure({ table: { resizable: true } }),
    ],
    content: markdownToHtml(value),
    editorProps: {
      attributes: {
        class: "prose-legal studio-prose min-h-[32rem] px-6 py-6 focus:outline-none",
        spellcheck: "true",
      },
    },
    onUpdate: ({ editor: instance }) => {
      const markdown = htmlToMarkdown(instance.getHTML());
      emitted.current = markdown;
      onChange(markdown);
    },
  });

  React.useEffect(() => {
    if (!editor || value === emitted.current) return;
    emitted.current = value;
    editor.commands.setContent(markdownToHtml(value), { emitUpdate: false });
  }, [editor, value]);

  if (!editor) {
    return (
      <div className={cn("border border-border bg-card", className)}>
        <p className="min-h-[32rem] px-6 py-6 text-sm text-muted-foreground">Loading editor…</p>
      </div>
    );
  }

  return (
    <div className={cn("border border-border bg-card", className)}>
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}

/* ──────────────────────────────── toolbar ────────────────────────────────── */

function Toolbar({ editor }: { editor: Editor }) {
  // useEditor does not re-render on every transaction, so the button states
  // subscribe to exactly the flags they draw.
  const state = useEditorState({
    editor,
    selector: ({ editor: instance }) => ({
      style: instance.isActive("heading", { level: 2 })
        ? "h2"
        : instance.isActive("heading", { level: 3 })
          ? "h3"
          : instance.isActive("heading", { level: 4 })
            ? "h4"
            : "paragraph",
      bold: instance.isActive("bold"),
      italic: instance.isActive("italic"),
      strike: instance.isActive("strike"),
      code: instance.isActive("code"),
      bulletList: instance.isActive("bulletList"),
      orderedList: instance.isActive("orderedList"),
      blockquote: instance.isActive("blockquote"),
      codeBlock: instance.isActive("codeBlock"),
      link: instance.isActive("link"),
      canUndo: instance.can().undo(),
      canRedo: instance.can().redo(),
    }),
  });

  const setStyle = (next: string) => {
    const chain = editor.chain().focus();
    if (next === "paragraph") chain.setParagraph().run();
    else chain.setHeading({ level: Number(next.slice(1)) as 2 | 3 | 4 }).run();
  };

  const toggleLink = () => {
    if (state.link) {
      editor.chain().focus().unsetLink().run();
      return;
    }
    const previous = editor.getAttributes("link").href as string | undefined;
    const href = window.prompt("Link address", previous ?? "https://");
    if (href === null) return;
    if (!href.trim()) {
      editor.chain().focus().unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: href.trim() }).run();
  };

  return (
    <div className="sticky top-0 z-10 flex flex-wrap items-center gap-1 border-b border-border bg-muted/80 px-3 py-2 backdrop-blur">
      <ToolButton
        label="Undo"
        hint="Ctrl+Z"
        icon={Undo2}
        disabled={!state.canUndo}
        onClick={() => editor.chain().focus().undo().run()}
      />
      <ToolButton
        label="Redo"
        hint="Ctrl+Shift+Z"
        icon={Redo2}
        disabled={!state.canRedo}
        onClick={() => editor.chain().focus().redo().run()}
      />

      <Divider />

      <select
        aria-label="Paragraph style"
        value={state.style}
        onChange={(event) => setStyle(event.target.value)}
        className="h-8 border border-border bg-background px-2 text-xs text-primary outline-none transition-colors hover:border-accent focus-visible:border-accent"
      >
        {styles.map((style) => (
          <option key={style.value} value={style.value}>
            {style.label}
          </option>
        ))}
      </select>

      <Divider />

      <ToolButton
        label="Bold"
        hint="Ctrl+B"
        icon={Bold}
        active={state.bold}
        onClick={() => editor.chain().focus().toggleBold().run()}
      />
      <ToolButton
        label="Italic"
        hint="Ctrl+I"
        icon={Italic}
        active={state.italic}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      />
      <ToolButton
        label="Strikethrough"
        icon={Strikethrough}
        active={state.strike}
        onClick={() => editor.chain().focus().toggleStrike().run()}
      />
      <ToolButton
        label="Inline code"
        icon={Code}
        active={state.code}
        onClick={() => editor.chain().focus().toggleCode().run()}
      />

      <Divider />

      <ToolButton
        label="Bulleted list"
        icon={List}
        active={state.bulletList}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      />
      <ToolButton
        label="Numbered list"
        icon={ListOrdered}
        active={state.orderedList}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      />
      <ToolButton
        label="Quote"
        icon={Quote}
        active={state.blockquote}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
      />
      <ToolButton
        label="Code block"
        icon={SquareCode}
        active={state.codeBlock}
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
      />

      <Divider />

      <ToolButton
        label={state.link ? "Remove link" : "Insert link"}
        icon={state.link ? Link2Off : Link2}
        active={state.link}
        onClick={toggleLink}
      />
      <ToolButton
        label="Insert table"
        icon={Table}
        onClick={() =>
          editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
        }
      />
      <ToolButton
        label="Divider"
        icon={Minus}
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
      />

      <Divider />

      <ToolButton
        label="Clear formatting"
        icon={RemoveFormatting}
        onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()}
      />
    </div>
  );
}

function Divider() {
  return <span aria-hidden className="mx-1 h-5 w-px bg-border" />;
}

function ToolButton({
  label,
  hint,
  icon: Icon,
  active,
  disabled,
  onClick,
}: {
  label: string;
  hint?: string;
  icon: LucideIcon;
  active?: boolean;
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      // The editable area keeps the selection: without this, pressing a button
      // would blur the document and the command would have nothing to act on.
      onMouseDown={(event) => event.preventDefault()}
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      aria-pressed={active}
      title={hint ? `${label} (${hint})` : label}
      className={cn(
        "inline-flex h-8 w-8 items-center justify-center border border-transparent text-primary transition-colors",
        "hover:border-border hover:bg-background",
        active && "border-accent bg-background text-accent",
        disabled && "cursor-not-allowed opacity-35 hover:border-transparent hover:bg-transparent",
      )}
    >
      <Icon aria-hidden className="h-4 w-4" />
    </button>
  );
}
