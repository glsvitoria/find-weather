import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { toast } from "react-toastify";

import { FileArrowDown, Files, Trash } from "@phosphor-icons/react";

import loadingAnimation from "../../assets/loading.json";
import { AttachmentData } from "@/types/types";

interface IFileItemProps {
  data: {
    name: string;
    file: string;
  };
  attachments: AttachmentData[];
  setAttachment: Dispatch<SetStateAction<AttachmentData[]>>;
}

export default function FileItem({
  data,
  attachments,
  setAttachment,
}: IFileItemProps) {
  const { file, name } = data;

  const handleViewAttachment = useCallback(async () => {
    try {
      const link = document.createElement("a");

      link.href = file;
      link.download = `${name}`;

      link.click();
    } catch {
      toast.error(`Erro ao baixar o arquivo: ${name}`);
    }
  }, [file, name]);

  const deleteFile = (fileName: string) => {
    const attachmentFiltered = attachments?.filter(
      item => item.fileName !== fileName,
    );

    if (attachmentFiltered && setAttachment) {
      setAttachment(attachmentFiltered);
    }
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loadingAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div
      className="flex items-center gap-2 rounded-lg border border-zinc-300 bg-zinc-100 p-2"
      title={`Arquivo para download: ${name}`}
    >
      <div className="h-12 w-12 rounded-lg bg-zinc-600 bg-opacity-20 p-2 text-red-700">
        <Files weight="regular" size={32} />
      </div>
      <div className=" mr-4 flex flex-col justify-between">
        <p className="text-xs font-bold leading-normal break-words text-primary">
          {name}
        </p>
      </div>

      <div className="ml-auto flex gap-5 text-primary">
        <button
          type="button"
          title="Fazer download"
          onClick={() => handleViewAttachment()}
          className="sm:flex flex-col items-center text-[0.5rem] uppercase transition duration-200 hover:scale-110  hidden"
        >
          <FileArrowDown weight="bold" size={20} /> Baixar
        </button>
        <button
          type="button"
          onClick={() => deleteFile(name)}
          className="flex flex-col items-center text-[0.5rem] uppercase transition duration-200 hover:scale-110 "
        >
          <Trash weight="bold" size={20} />
          Excluir
        </button>
      </div>
    </div>
  );
}
