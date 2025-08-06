/* eslint-disable i18next/no-literal-string */
import React, { useRef, useEffect, memo, useCallback } from 'react';

import BoldIcon from '@/shared/assets/bold.svg';
import CodeIcon from '@/shared/assets/code.svg';
import H1Icon from '@/shared/assets/heading-1.svg';
import H2Icon from '@/shared/assets/heading-2.svg';
import H3Icon from '@/shared/assets/heading-3.svg';
import ImageIcon from '@/shared/assets/images.svg';
import ItalicIcon from '@/shared/assets/italic.svg';
import OrderedListIcon from '@/shared/assets/list-ordered.svg';
import UnorderedListIcon from '@/shared/assets/list.svg';
import UnderlineIcon from '@/shared/assets/underline.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button } from '@/shared/ui/Button/Button';
import { Card } from '@/shared/ui/Card/Card';
import { Tooltip } from '@/shared/ui/Tooltip/Tooltip';

import styles from './HtmlEditor.module.scss';

interface HtmlEditorProps {
    className?: string;
    html?: string;
    onChangeContent?: (html: string) => void;
    showPreview?: boolean;
}

export const HtmlEditor = memo((props: HtmlEditorProps) => {
    const {
        html = '',
        onChangeContent,
        className,
        showPreview = false,
    } = props;
    const editorRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const saveSelection = useCallback((): Range | null => {
        const selection = window.getSelection();
        if (selection && selection.rangeCount > 0) {
            return selection.getRangeAt(0).cloneRange();
        }
        return null;
    }, []);

    const restoreSelection = useCallback((range: Range | null) => {
        if (range && editorRef.current) {
            const selection = window.getSelection();
            if (selection) {
                selection.removeAllRanges();
                selection.addRange(range);
            }
        }
    }, []);

    useEffect(() => {
        if (editorRef.current && editorRef.current.innerHTML !== html) {
            const savedRange = saveSelection();
            editorRef.current.innerHTML = html;
            restoreSelection(savedRange);
        }
    }, [html, restoreSelection, saveSelection]);

    const handleInput = useCallback(() => {
        if (editorRef.current) {
            const newContent = editorRef.current.innerHTML;
            if (newContent !== html) {
                onChangeContent?.(newContent);
            }
        }
    }, [html, onChangeContent]);

    const handleFormatting = useCallback(
        (format: string) => {
            const savedRange = saveSelection();
            const selection = window.getSelection();
            if (selection && selection.rangeCount > 0) {
                const range = selection.getRangeAt(0);
                const selectedText = range.toString();
                if (selectedText) {
                    let formattedText = '';
                    switch (format) {
                        case 'bold':
                            formattedText = `<b>${selectedText}</b>`;
                            break;
                        case 'italic':
                            formattedText = `<i>${selectedText}</i>`;
                            break;
                        case 'underline':
                            formattedText = `<u>${selectedText}</u>`;
                            break;
                        case 'h1':
                            formattedText = `<h1>${selectedText}</h1>`;
                            break;
                        case 'h2':
                            formattedText = `<h2>${selectedText}</h2>`;
                            break;
                        case 'h3':
                            formattedText = `<h3>${selectedText}</h3>`;
                            break;
                        case 'code':
                            formattedText = `<code><pre>${selectedText}</pre></code>`;
                            break;
                        default:
                            formattedText = selectedText;
                            break;
                    }
                    range.deleteContents();
                    range.insertNode(
                        document
                            .createRange()
                            .createContextualFragment(formattedText),
                    );
                    if (editorRef.current) {
                        onChangeContent?.(editorRef.current.innerHTML);
                        setTimeout(() => restoreSelection(savedRange), 0);
                    }
                }
            }
        },
        [onChangeContent, restoreSelection, saveSelection],
    );

    const handleImageUpload = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const file = event.target.files?.[0];
            if (file && editorRef.current) {
                const savedRange = saveSelection();
                const reader = new FileReader();
                reader.onload = (e) => {
                    const imgSrc = e.target?.result as string;
                    const imgElement = `<img src="${imgSrc}" alt="Uploaded image" style="max-width: 100%;" />`;
                    const selection = window.getSelection();
                    if (selection && selection.rangeCount > 0) {
                        const range = selection.getRangeAt(0);
                        range.insertNode(
                            document
                                .createRange()
                                .createContextualFragment(imgElement),
                        );
                        if (editorRef.current) {
                            onChangeContent?.(editorRef.current.innerHTML);
                            setTimeout(() => restoreSelection(savedRange), 0);
                        }
                    }
                };
                reader.readAsDataURL(file);
            }
        },
        [onChangeContent, restoreSelection, saveSelection],
    );

    const handleList = useCallback(
        (type: 'ul' | 'ol') => {
            const savedRange = saveSelection();
            const selection = window.getSelection();
            if (selection && selection.rangeCount > 0 && editorRef.current) {
                const range = selection.getRangeAt(0);
                const selectedText = range.toString();
                const items = selectedText
                    .split('\n')
                    .filter((item) => item.trim())
                    .map((item) => `<li>${item}</li>`);
                const listElement = `<${type}>${items.join('')}</${type}>`;
                range.deleteContents();
                range.insertNode(
                    document
                        .createRange()
                        .createContextualFragment(listElement),
                );
                onChangeContent?.(editorRef.current.innerHTML);
                setTimeout(() => restoreSelection(savedRange), 0);
            }
        },
        [onChangeContent, restoreSelection, saveSelection],
    );

    return (
        <Card className={classNames(styles.editorContainer, {}, [className])}>
            <div className={styles.toolbar}>
                <Tooltip content="Жирный" preferredPlacement="top">
                    <Button
                        theme="ghostIcon"
                        onClick={() => handleFormatting('bold')}
                    >
                        <BoldIcon width={15} />
                    </Button>
                </Tooltip>

                <Tooltip content="Курсив" preferredPlacement="top">
                    <Button
                        theme="ghostIcon"
                        onClick={() => handleFormatting('italic')}
                    >
                        <ItalicIcon width={15} />
                    </Button>
                </Tooltip>

                <Tooltip content="Подчеркнутый" preferredPlacement="top">
                    <Button
                        theme="ghostIcon"
                        onClick={() => handleFormatting('underline')}
                    >
                        <UnderlineIcon width={15} />
                    </Button>
                </Tooltip>

                <Tooltip content="Заголовок 1" preferredPlacement="top">
                    <Button
                        theme="ghostIcon"
                        onClick={() => handleFormatting('h1')}
                    >
                        <H1Icon width={15} />
                    </Button>
                </Tooltip>
                <Tooltip content="Заголовок 2" preferredPlacement="top">
                    <Button
                        theme="ghostIcon"
                        onClick={() => handleFormatting('h2')}
                    >
                        <H2Icon width={15} />
                    </Button>
                </Tooltip>
                <Tooltip content="Заголовок 3" preferredPlacement="top">
                    <Button
                        theme="ghostIcon"
                        onClick={() => handleFormatting('h3')}
                    >
                        <H3Icon width={15} />
                    </Button>
                </Tooltip>
                <Tooltip
                    content="Маркированный список"
                    preferredPlacement="top"
                >
                    <Button theme="ghostIcon" onClick={() => handleList('ul')}>
                        <UnorderedListIcon width={15} />
                    </Button>
                </Tooltip>
                <Tooltip content="Нумерованный список" preferredPlacement="top">
                    <Button theme="ghostIcon" onClick={() => handleList('ol')}>
                        <OrderedListIcon width={15} />
                    </Button>
                </Tooltip>
                <Tooltip
                    content="Загрузить изображение"
                    preferredPlacement="top"
                >
                    <Button
                        theme="ghostIcon"
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <ImageIcon width={15} />
                    </Button>
                </Tooltip>
                <Tooltip content="Код" preferredPlacement="top">
                    <Button
                        theme="ghostIcon"
                        onClick={() => handleFormatting('code')}
                    >
                        <CodeIcon width={15} />
                    </Button>
                </Tooltip>

                <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleImageUpload}
                />
            </div>
            <div
                ref={editorRef}
                className={styles.editor}
                contentEditable
                onInput={handleInput}
            />
            {showPreview && (
                <div className={styles.preview}>
                    <h3>HTML Output:</h3>
                    <pre>{html}</pre>
                </div>
            )}
        </Card>
    );
});
