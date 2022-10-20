local display = false

RegisterCommand("card", function(source)
	SetDisplay(not display)
end)

Citizen.CreateThread(function()
	while display do
		Citizen.Wait(0)
		DisableControlAction(0, 1, display)
		DisableControlAction(0, 2, display)
		DisableControlAction(0, 142, display)
		DisableControlAction(0, 18, display)
		DisableControlAction(0, 322, display)
		DisableControlAction(0, 106, display)
	end
end)

function SetDisplay(bool)
	display = bool
	SetNuiFocus(bool, bool)
	SendNUIMessage({
		type = "ui",
		status = bool,
	})
end

RegisterCommand("test", function(source)
	SetPlayerWeaponDamageModifier(PlayerId(), 100.0)
	print(GetPlayerWeaponDamageModifier(PlayerId()))
end)