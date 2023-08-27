import {
  InputHTMLAttributes,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useDropzone } from "react-dropzone";

import { useField } from "@unform/core";
import { Files, XCircle } from "@phosphor-icons/react";
import { overrideTailwindClasses } from "tailwind-override";
import readFileAsDataURL from "@/utils/readFileAsDataURL";
import { v4 as uuidv4 } from "uuid";
import { AttachmentData } from "@/types/types";
import FileItem from "./FileItem";
import { toast } from "react-toastify";

interface IDropzoneProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  containerClassName?: string;

  attachments: AttachmentData[];
  setAttachments: React.Dispatch<React.SetStateAction<AttachmentData[]>>;
}

export default function Dropzone({
  label,
  name,
  containerClassName = "",
  attachments,
  setAttachments,
  ...rest
}: IDropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const { registerField, fieldName, defaultValue, error } = useField(name);

  const [filename, setFilename] = useState(defaultValue);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      setValue(ref: any, value: any) {
        setFilename(value);
      },
      getValue() {
        return filename;
      },
    });
  }, [registerField, fieldName, filename]);

  const onDropAccepted = useCallback(
    async (acceptedFiles: File[]) => {
      const attachmentsUploaded: AttachmentData[] = [];

      for await (const file of acceptedFiles) {
        const data = await readFileAsDataURL(file);

        if (!data) {
          toast.error("Favor anexar o arquivo novamente!");
        }

        attachmentsUploaded.push({
          id: uuidv4(),
          fileContent: String(data),
          fileName: file.name,
          size: file.size,
        });
      }

      setAttachments(state => [...state, ...attachmentsUploaded]);
    },
    [setAttachments],
  );

  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      onDropAccepted,
      accept: { "application/pdf": [".pdf"] },
      // maxFiles,
    });

  const renderDragMessage = useCallback(() => {
    if (!isDragActive) {
      return (
        <div className="cursor-pointer text-zinc-500 flex flex-col xxs:gap-2 gap-1 justify-center items-center xxs:text-5xl text-4xl">
          <Files className="rounded-full bg-white p-2 text-secondary" />
          <p className="text-center text-xs">
            <strong className="block">Solte seus arquivos aqui</strong>
            ou clique para selecionar
          </p>
          <p className="text-[10px]">(Somente arquivos.pdf)</p>
        </div>
      );
    }

    if (isDragReject) {
      return (
        <div className="cursor-pointer flex flex-col xxs:gap-2 gap-1 justify-center items-center xxs:text-5xl text-4xl text-error">
          <XCircle size={48} className="rounded-full bg-white p-2 text-error" />

          <p className="text-center text-xs">
            <strong className="block">Formato de arquivo não suportado</strong>
          </p>
        </div>
      );
    }

    return (
      <div className="cursor-pointer flex flex-col xxs:gap-2 gap-1 justify-center items-center xxs:text-5xl text-4xl text-success">
        <Files className="rounded-full bg-white p-2 text-secondary" />
        <p className="text-center text-xs">
          <strong className="block">Solte seus arquivos aqui</strong>
        </p>
        <p className="text-[10px]">(Somente arquivos.pdf)</p>
      </div>
    );
  }, [isDragActive, isDragReject]);

  return (
    <div className="flex flex-col gap-4">
      <div>
        <label htmlFor={fieldName}>{label}</label>
        <div className="rounded-lg border border-zinc-300 bg-zinc-100 p-2 transition cursor-pointer">
          <div
            className={overrideTailwindClasses(
              `rounded-lg border border-dashed border-zinc-400 p-1 transition hover:border-secondary hover:bg-secondary hover:bg-opacity-5 ${containerClassName} `,
            )}
          >
            <div
              className="flex w-full flex-col items-center py-1"
              {...getRootProps()}
            >
              <input {...getInputProps()} />

              {renderDragMessage()}
            </div>
          </div>
        </div>
        {error && <span>{error}</span>}
      </div>
      {attachments && (
        <div className="grid xl:grid-cols-2 gap-4">
          {attachments.map(attachment => (
            <FileItem
              key={attachment.id}
              data={{
                name: attachment.fileName,
                file: attachment.fileContent,
              }}
              attachments={attachments}
              setAttachment={setAttachments}
            />
          ))}
        </div>
      )}
    </div>
  );
}
