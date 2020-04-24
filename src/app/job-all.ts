export interface JobAll {
    jobdetails: {
        jobID: string;
        model_name: string;
        signedUrls: string[];
    }
    classfrequencies: object;
    ingested_date_time: string;
}