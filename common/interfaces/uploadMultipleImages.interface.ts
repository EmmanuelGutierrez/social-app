import { ControllerRenderProps } from "react-hook-form";

export interface UploadMultipleImagesI {
    field: ControllerRenderProps<
        {
            body: string;
            files?: FileList | undefined;
        },
        "files"
    >;
    setPreviews?: (previews: string[]) => void;
}
