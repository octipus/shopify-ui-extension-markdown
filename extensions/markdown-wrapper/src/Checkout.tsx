import {
  reactExtension,
  useSettings,
  Text,
  BlockStack,
  Heading,
  List,
  ListItem,
  Divider,
  TextBlock,
} from "@shopify/ui-extensions-react/checkout";

// 1. Choose an extension target
export default reactExtension("purchase.checkout.block.render", () => (
  <Extension />
));

function Extension() {
  const { markdown_wrapper } = useSettings();

  const renderMarkdown = (content: string) => {
    const lines = content.split('\n').filter(line => line.trim());
    
    let currentList: string[] = [];
    let isOrderedList = false;
    
    // Helper function to process inline formatting
    const processInlineFormatting = (text: string) => {
        const parts: { text: string; type: 'regular' | 'bold' | 'italic' }[] = [];
        let currentIndex = 0;

        // Find all bold and italic patterns
        const regex = /(\*\*.*?\*\*|\*[^*]+\*)/g;
        let match;

        while ((match = regex.exec(text)) !== null) {
            // Add text before the match
            if (match.index > currentIndex) {
                parts.push({
                    text: text.slice(currentIndex, match.index),
                    type: 'regular'
                });
            }

            // Add the formatted text
            const content = match[0];
            if (content.startsWith('**') && content.endsWith('**')) {
                parts.push({
                    text: content.slice(2, -2),
                    type: 'bold'
                });
            } else if (content.startsWith('*') && content.endsWith('*')) {
                parts.push({
                    text: content.slice(1, -1),
                    type: 'italic'
                });
            }

            currentIndex = match.index + match[0].length;
        }

        // Add any remaining text
        if (currentIndex < text.length) {
            parts.push({
                text: text.slice(currentIndex),
                type: 'regular'
            });
        }

        // If no formatting found, return simple text
        if (parts.length === 0) {
            return <Text>{text}</Text>;
        }

        // Return the formatted parts
        return parts.map((part, index) => {
            switch (part.type) {
                case 'bold':
                    return <Text key={index} emphasis="bold">{part.text}</Text>;
                case 'italic':
                    return <Text key={index} emphasis="italic">{part.text}</Text>;
                default:
                    return <Text key={index}>{part.text}</Text>;
            }
        });
    };

    const renderedLines = lines.map((line, index) => {
        // Handle headings (# Heading 1, ## Heading 2, ### Heading 3)
        const headingMatch = line.trim().match(/^(#{1,3})\s+(.+)$/);
        if (headingMatch) {
            const level = headingMatch[1].length; // 1, 2, or 3
            const text = headingMatch[2];
            return (
                <BlockStack key={index} spacing="base">
                    <Heading level={level as 1 | 2 | 3}>
                        {text}
                    </Heading>
                </BlockStack>
            );
        }

        // Handle horizontal rule (spacer)
        if (line.trim() === '---') {
            if (currentList.length > 0) {
                const listItems = [...currentList];
                const listType = isOrderedList ? "number" : "bullet";
                currentList = [];
                isOrderedList = false;
                return (
                    <BlockStack key={index} spacing="base">
                        <List spacing="base" marker={listType}>
                            {listItems.map((item, i) => (
                                <ListItem key={i}>{processInlineFormatting(item)}</ListItem>
                            ))}
                        </List>
                        <Divider />
                    </BlockStack>
                );
            }
            return (
                <BlockStack key={index} spacing="base">
                    <Divider />
                </BlockStack>
            );
        }

        // Handle list items (with inline formatting support)
        if (line.trim().indexOf('- ') === 0) {
            currentList.push(line.trim().substring(2));
            isOrderedList = false;
            return null;
        }
        
        // Handle ordered list items
        const orderedListMatch = line.trim().match(/^(\d+)\.\s(.+)$/);
        if (orderedListMatch) {
            currentList.push(orderedListMatch[2]);
            isOrderedList = true;
            return null;
        }
        
        // If we have collected list items and encounter a non-list line, render the list
        if (currentList.length > 0) {
            const listItems = [...currentList];
            const listType = isOrderedList ? "number" : "bullet";
            currentList = [];
            isOrderedList = false;
            return (
                <BlockStack key={index} spacing="base">
                    <List spacing="base" marker={listType}>
                        {listItems.map((item, i) => (
                            <ListItem key={i}>{processInlineFormatting(item)}</ListItem>
                        ))}
                    </List>
                    <TextBlock>
                        {processInlineFormatting(line)}
                    </TextBlock>
                </BlockStack>
            );
        }

        // Handle regular paragraphs with inline formatting
        return (
            <BlockStack key={index} spacing="base">
                <TextBlock>
                    {processInlineFormatting(line)}
                </TextBlock>
            </BlockStack>
        );
    });

    // Render any remaining list items
    if (currentList.length > 0) {
        const listItems = [...currentList];
        const listType = isOrderedList ? "number" : "bullet";
        renderedLines.push(
            <BlockStack key="final-list" spacing="base">
                <List spacing="base" marker={listType}>
                    {listItems.map((item, i) => (
                        <ListItem key={i}>{processInlineFormatting(item)}</ListItem>
                    ))}
                </List>
            </BlockStack>
        );
    }

    return (
        <BlockStack spacing="base">
            {renderedLines.filter(line => line !== null)}
        </BlockStack>
    );
};

 
  return (
    <Text>{renderMarkdown(String(markdown_wrapper || ''))}</Text>
  );

}