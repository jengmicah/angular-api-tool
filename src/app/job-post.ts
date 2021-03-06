export interface JobPost {
    metadata: {
        output: object;
        model_name: string;
        signedUrls: string[];
        jobID: string;
        module_names: string[];
    };
    mediatype: string;
    generatortype: string;
}