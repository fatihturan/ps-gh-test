import markdownIt from 'markdown-it';
import { useEffect, useState } from 'react';

function Markdown({ text }: { text: string }) {
    const [html, setHTML] = useState('');

    useEffect(() => {
        const md = markdownIt({ html: true, breaks: true });
        const result = md.render(text || '');
        const div = document.createElement('div');
        div.innerHTML = result;
        const links = div.querySelectorAll('a');
        links.forEach((link) => {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
        });

        setHTML(div.innerHTML);
        div.remove();
    }, [text]);
    return <div dangerouslySetInnerHTML={{ __html: html }} />;
}

export default Markdown;
