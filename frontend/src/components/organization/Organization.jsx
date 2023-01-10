import { useDispatch, useSelector } from "react-redux";
import { setDefaultOrganization } from "../../redux/reducers/OrganizationSlice";
import CreateOrganizationChannelModal from "./modal/CreateOrganizationChannelModal";
import CreateOrganizationModal from "./modal/CreateOrganizationModal";
import OrganizationAddUserModal from "./modal/OrganizationAddUserModal";
import Dropdown from "react-bootstrap/Dropdown";

const Organization = () => {
	const { organizations, defaultOrganization } = useSelector(
		(state) => state.organization
	);

	const dispatch = useDispatch();

	const handleSetDefaultOrganization = (organization) => {
		dispatch(setDefaultOrganization(organization));
	};

	return (
		<>
			{organizations &&
				organizations.map((organization) => {
					return (
						<Dropdown.Item
							onClick={() => {
								handleSetDefaultOrganization(organization);
							}}
						>
							{organization.organization_name}
						</Dropdown.Item>
					);
				})}
			<hr />
			{defaultOrganization && (
				<div>
					<Dropdown.Item>
						<OrganizationAddUserModal
							selectedOrganizationID={defaultOrganization.id}
						/>
					</Dropdown.Item>
					<Dropdown.Item>
						<CreateOrganizationChannelModal
							selectedOrganizationID={defaultOrganization.id}
						/>
					</Dropdown.Item>
				</div>
			)}
			<Dropdown.Item>
				<CreateOrganizationModal />
			</Dropdown.Item>
		</>
	);
};

export default Organization;
