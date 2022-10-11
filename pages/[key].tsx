import Layout from "../components/Layout";
import Editor from "@monaco-editor/react";

interface DocumentPageProps {
  contents: string;
  finalKey: string;
  originalKey: string;
  languageId: string;
  secret: string | null;
}
const DocumentPage = ({
  contents,
  finalKey,
  originalKey,
  languageId,
  secret,
}: DocumentPageProps) => {
  return (
    <Layout>
      <Editor
        height="90vh"
        defaultLanguage="javascript"
        defaultValue="// some commentsdfdfsdfsdfsdkfsjldfjsdlfjsdlfsdlf
        //sdfsdklfsdfsldfsdklfsldf/sdf
        //ssdfsdsdfsdf"
      />
    </Layout>
  );
};
