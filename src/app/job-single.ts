export interface JobSingle {
    metadata_id: string;
    inputfilename: string;
    mediatype: string;
    generatortype: string;
    metadata: object;
    version: string;
    jobdetails: {
        jobID: string;
        model_name: string;
        signedUrls: string;
    };
    classfrequencies: object;
    ingested_date_time: string;
}