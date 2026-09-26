type OptionalLabelProps = {
  label: string;
};

const OptionalLabel = ({ label }: OptionalLabelProps) => (
  <>
    {label}&nbsp;<span className="font-normal text-espresso/50">(optional)</span>
  </>
);

export default OptionalLabel;
