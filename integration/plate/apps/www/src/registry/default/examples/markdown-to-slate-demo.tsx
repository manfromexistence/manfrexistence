'use client';

import React from 'react';

import { withProps } from '@udecode/cn';
import {
  BoldPlugin,
  CodePlugin,
  ItalicPlugin,
  StrikethroughPlugin,
  SubscriptPlugin,
  SuperscriptPlugin,
  UnderlinePlugin,
} from '@udecode/plate-basic-marks/react';
import { BlockquotePlugin } from '@udecode/plate-block-quote/react';
import {
  CodeBlockPlugin,
  CodeSyntaxPlugin,
} from '@udecode/plate-code-block/react';
import { HEADING_KEYS } from '@udecode/plate-heading';
import { HighlightPlugin } from '@udecode/plate-highlight/react';
import { HorizontalRulePlugin } from '@udecode/plate-horizontal-rule/react';
import { KbdPlugin } from '@udecode/plate-kbd/react';
import { LinkPlugin } from '@udecode/plate-link/react';
import {
  MarkdownPlugin,
  remarkMdx,
  remarkMention,
} from '@udecode/plate-markdown';
import { InlineEquationPlugin } from '@udecode/plate-math/react';
import { ImagePlugin } from '@udecode/plate-media/react';
import { MentionPlugin } from '@udecode/plate-mention/react';
import { NodeIdPlugin } from '@udecode/plate-node-id';
import {
  TableCellHeaderPlugin,
  TableCellPlugin,
  TablePlugin,
  TableRowPlugin,
} from '@udecode/plate-table/react';
import {
  ParagraphPlugin,
  Plate,
  PlateLeaf,
  usePlateEditor,
} from '@udecode/plate/react';
import remarkEmoji from 'remark-emoji';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';

import { autoformatPlugin } from '@/registry/default/components/editor/plugins/autoformat-plugin';
import { basicNodesPlugins } from '@/registry/default/components/editor/plugins/basic-nodes-plugins';
import { indentListPlugins } from '@/registry/default/components/editor/plugins/indent-list-plugins';
import { linkPlugin } from '@/registry/default/components/editor/plugins/link-plugin';
import { mediaPlugins } from '@/registry/default/components/editor/plugins/media-plugins';
import { tablePlugin } from '@/registry/default/components/editor/plugins/table-plugin';
import { useDebounce } from '@/registry/default/hooks/use-debounce';
import { BlockquoteElement } from '@/registry/default/plate-ui/blockquote-element';
import { CodeBlockElement } from '@/registry/default/plate-ui/code-block-element';
import { CodeLeaf } from '@/registry/default/plate-ui/code-leaf';
import { CodeSyntaxLeaf } from '@/registry/default/plate-ui/code-syntax-leaf';
import { Editor, EditorContainer } from '@/registry/default/plate-ui/editor';
import { HeadingElement } from '@/registry/default/plate-ui/heading-element';
import { HighlightLeaf } from '@/registry/default/plate-ui/highlight-leaf';
import { HrElement } from '@/registry/default/plate-ui/hr-element';
import { ImageElement } from '@/registry/default/plate-ui/image-element';
import { KbdLeaf } from '@/registry/default/plate-ui/kbd-leaf';
import { LinkElement } from '@/registry/default/plate-ui/link-element';
import { ParagraphElement } from '@/registry/default/plate-ui/paragraph-element';
import {
  TableCellElement,
  TableCellHeaderElement,
} from '@/registry/default/plate-ui/table-cell-element';
import { TableElement } from '@/registry/default/plate-ui/table-element';
import { TableRowElement } from '@/registry/default/plate-ui/table-row-element';

import { MentionElement } from '../plate-ui/mention-element';

const initialMarkdown = `# Markdown syntax guide

## Headers

# This is a Heading h1
## This is a Heading h2
###### This is a Heading h6

## Emphasis

*This text will be italic*. _This will also be italic_

**This text will be bold**. __This will also be bold__

_You **can** combine them_

## Lists

### Unordered

* Item 1
* Item 2
* Item 2a
* Item 2b

### Ordered

1. Item 1
2. Item 2
3. Item 3
    1. Item 3a
    2. Item 3b

## Images

![This is an alt text.](https://images.unsplash.com/photo-1506619216599-9d16d0903dfd?q=80&w=2669&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D "This is a sample image.")

## Links

You may be using [Markdown Live Preview](https://markdownlivepreview.com/).

## Blockquotes

> Markdown is a lightweight markup language with plain-text-formatting syntax, created in 2004 by John Gruber with Aaron Swartz.

## Tables

| Left columns  | Right columns |
| ------------- |:-------------:|
| left foo      | right foo     |
| left bar      | right bar     |
| left baz      | right baz     |

## Blocks of code

\`\`\`js
let message = 'Hello world';
alert(message);
\`\`\`

## Inline code

This website is using \`plate\`.

## GitHub Flavored Markdown

### Task Lists

- [x] Completed task
- [ ] Incomplete task
- [ ] @mentions , [links](https://platejs.org), **formatting**, and <del>tags</del> supported
- [ ] list syntax required (any unordered or ordered list supported)

### Strikethrough

~~This text is strikethrough~~

### Autolinks

Visit https://github.com automatically converts to a link
Email example@example.com also converts automatically

### Emoji

:smile: :heart:
`;

export default function MarkdownDemo() {
  const [markdownValue, setMarkdownValue] = React.useState(initialMarkdown);
  const debouncedMarkdownValue = useDebounce(markdownValue, 300);

  const markdownEditor = usePlateEditor({
    plugins: [],
    value: [{ children: [{ text: markdownValue }], type: 'p' }],
  });

  const editor = usePlateEditor(
    {
      override: {
        components: {
          [BlockquotePlugin.key]: BlockquoteElement,
          [BoldPlugin.key]: withProps(PlateLeaf, { as: 'strong' }),
          [CodeBlockPlugin.key]: CodeBlockElement,
          [CodePlugin.key]: CodeLeaf,
          [CodeSyntaxPlugin.key]: CodeSyntaxLeaf,
          [HEADING_KEYS.h1]: withProps(HeadingElement, { variant: 'h1' }),
          [HEADING_KEYS.h2]: withProps(HeadingElement, { variant: 'h2' }),
          [HEADING_KEYS.h3]: withProps(HeadingElement, { variant: 'h3' }),
          [HEADING_KEYS.h4]: withProps(HeadingElement, { variant: 'h4' }),
          [HEADING_KEYS.h5]: withProps(HeadingElement, { variant: 'h5' }),
          [HEADING_KEYS.h6]: withProps(HeadingElement, { variant: 'h6' }),
          [HighlightPlugin.key]: HighlightLeaf,
          [HorizontalRulePlugin.key]: HrElement,
          [ImagePlugin.key]: ImageElement,
          [ItalicPlugin.key]: withProps(PlateLeaf, { as: 'em' }),
          [KbdPlugin.key]: KbdLeaf,
          [LinkPlugin.key]: LinkElement,
          [MentionPlugin.key]: MentionElement,
          [ParagraphPlugin.key]: ParagraphElement,
          [StrikethroughPlugin.key]: withProps(PlateLeaf, { as: 's' }),
          [SubscriptPlugin.key]: withProps(PlateLeaf, { as: 'sub' }),
          [SuperscriptPlugin.key]: withProps(PlateLeaf, { as: 'sup' }),
          [TableCellHeaderPlugin.key]: TableCellHeaderElement,
          [TableCellPlugin.key]: TableCellElement,
          [TablePlugin.key]: TableElement,
          [TableRowPlugin.key]: TableRowElement,
          [UnderlinePlugin.key]: withProps(PlateLeaf, { as: 'u' }),
        },
      },
      plugins: [
        ...basicNodesPlugins,
        NodeIdPlugin,
        HorizontalRulePlugin,
        linkPlugin,
        tablePlugin,
        ...mediaPlugins,
        InlineEquationPlugin,
        HighlightPlugin,
        KbdPlugin,
        ImagePlugin,
        ...indentListPlugins,
        autoformatPlugin,
        MarkdownPlugin.configure({
          options: {
            remarkPlugins: [remarkMath, remarkGfm, remarkMdx, remarkMention],
          },
        }),
        MentionPlugin.configure({
          options: { triggerPreviousCharPattern: /^$|^[\s"']$/ },
        }),
      ],
      value: (editor) =>
        editor.getApi(MarkdownPlugin).markdown.deserialize(initialMarkdown, {
          remarkPlugins: [remarkMath, remarkGfm, remarkMdx, remarkEmoji as any],
        }),
    },
    []
  );

  React.useEffect(() => {
    if (debouncedMarkdownValue !== initialMarkdown) {
      editor.tf.reset();
      editor.tf.setValue(
        editor.api.markdown.deserialize(debouncedMarkdownValue, {
          remarkPlugins: [remarkMath, remarkGfm, remarkMdx, remarkEmoji as any],
        })
      );
    }
  }, [debouncedMarkdownValue, editor]);

  return (
    <div className="grid h-full grid-cols-2 overflow-y-auto">
      <Plate
        onValueChange={() => {
          const value = markdownEditor.children
            .map((node: any) => markdownEditor.api.string(node))
            .join('\n');
          setMarkdownValue(value);
        }}
        editor={markdownEditor}
      >
        <EditorContainer>
          <Editor
            variant="none"
            className="bg-muted/50 p-2 font-mono text-sm"
          />
        </EditorContainer>
      </Plate>

      <Plate editor={editor}>
        <EditorContainer>
          <Editor variant="none" className="px-4 py-2" />
        </EditorContainer>
      </Plate>
    </div>
  );
}
