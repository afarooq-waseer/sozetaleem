declare class BlogImporter {
    private categories;
    private tags;
    private users;
    private posts;
    importFromAtom(filePath: string): Promise<void>;
    private createBasicEntities;
    private createPosts;
    private createComments;
    private createSlug;
    private createUniqueSlug;
    private stripHtml;
    private createExcerpt;
    private extractImages;
}
export { BlogImporter };
