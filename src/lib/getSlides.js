import * as path from 'path'
import * as fs from "fs";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), 'src/slides');
export function getSlideData(id) {
    const fullPath = path.join(postsDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
        id,
        ...matterResult.data,
        content: matterResult.content,
    };
}