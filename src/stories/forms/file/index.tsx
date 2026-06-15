import {
  File as ZendeskFile,
  FileList as ZendeskFileList,
  FileUpload as ZendeskFileUpload,
  IFileProps,
  IFileUploadProps,
} from "@zendeskgarden/react-forms";
import { ComponentProps } from "react";
import styled from "styled-components";

const UgFileUpload = styled(ZendeskFileUpload)``;
const UgFileList = styled(ZendeskFileList)``;
const UgFile = styled(ZendeskFile)``;

type FileListProps = Omit<ComponentProps<typeof ZendeskFileList>, "ref">;

const FileUpload = (props: IFileUploadProps) => <UgFileUpload {...props} />;
const FileList = (props: FileListProps) => <UgFileList {...props} />;
const File = (props: IFileProps) => <UgFile {...props} />;

export { FileUpload, FileList, File };