import { useDispatch, useSelector } from "react-redux";
import { setDefaultOrganization } from "../redux/reducers/OrganizationSlice";
import OrganizationAddUser from "./OrganizationAddUser";
import OrganizationCreate from "./OrganizationCreate";

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
							<OrganizationAddUser
								selectedOrganizationID={defaultOrganization.id}
							/>
						</div>
					)}
					<OrganizationCreate />
				</>
			)}
		</>
	);
};

export default Organization;
