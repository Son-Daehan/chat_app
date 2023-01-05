import { useDispatch, useSelector } from "react-redux";
import { setDefaultOrganization } from "../redux/reducers/OrganizationSlice";
import CreateOrganizationChannelModal from "./modal/CreateOrganizationChannelModal";
import CreateOrganizationModal from "./modal/CreateOrganizationModal";
import OrganizationAddUserModal from "./modal/OrganizationAddUserModal";

const Organization = () => {
	const { organizations, defaultOrganization, displayOrganizationSettings } =
		useSelector((state) => state.organization);

	const dispatch = useDispatch();

	const handleSetDefaultOrganization = (organization) => {
		dispatch(setDefaultOrganization(organization));
	};

	return (
		<>
			{displayOrganizationSettings && (
				<>
					{organizations &&
						organizations.map((organization) => {
							return (
								<h3
									onClick={() => {
										handleSetDefaultOrganization(organization);
									}}
								>
									{organization.organization.organization_name}
								</h3>
							);
						})}
					<hr />
					{defaultOrganization && (
						<div>
							<OrganizationAddUserModal
								selectedOrganizationID={defaultOrganization.id}
							/>
							<CreateOrganizationChannelModal
								selectedOrganizationID={defaultOrganization.id}
							/>
						</div>
					)}
					<CreateOrganizationModal />
				</>
			)}
		</>
	);
};

export default Organization;
