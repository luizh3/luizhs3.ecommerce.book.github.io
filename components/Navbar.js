const navbarPrimaryTemplate = document.createElement('template');
navbarPrimaryTemplate.innerHTML = `
    <style>
        @import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css");

        .content {
            width: 100%;
            height: 75px;
            display: flex;
            align-items: center;
            justify-content: space-evenly;
            border-bottom: var( --border-default );
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            background-color:#FFFFFF;
        }

        .action-element {
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .actions {
            display: flex;
            gap: var( --gap-default );
            cursor: pointer;
            padding: 7px 13px;
        }

        .logo {
            font-weight: 700;
            font-size: 20px;
            cursor: pointer;
        }

        .action-element, .logo {
            text-decoration: none;
            color: inherit;
        }

        .menu {
            display: none;
            cursor: pointer;
        }

        .input-search {
            width: 550px;
        }

        @media ( max-width: 858px ) {

            .input-search {
                width: 50%;
            }

            .logo {
                font-size: 15px;
            }

            .content {
                position: fixed;
                z-index: var(--nav-bar-index-fixed);
            }

            .menu {
                display: block;
            }
        
            .actions {
                position: fixed;
                width: 100%;
                height: 100vh;
                background: var(--eerie-black);
                top: 60px;
                transform: translateX(-100%);
                flex-direction:column;
                z-index: var(--nav-bar-index-fixed);
                transition: opacity 0.2s ease-in-out;
                align-items: center;
                opacity: 0;
            }


            .actions.activate {
                transform: translateX(0);
                opacity: 1;
            }
        
            .actions .action-element {
                margin: 15px 0px 0px 0px;
                line-height: 30px;
                background-color:#FFFFFF;
                width: 80%;
                align-items: center;
                display: flex;
                flex-direction: row;
                gap: 10px;
                padding: 5px;
                font-weight: 700;
                border-radius: var( --radius-default );
            }

            .actions .action-element:hover {
                background-color:var( --blue-weak-color );
                color:var( --blue-strong-color );
            }

        }

    </style>
    <div class="content">
        <a class="logo" href="./home.html">
         INFINITE CART
        </a>
        <input-search class="input-search">
            <slot slot="search-icon" name="search-icon"></slot>
        </input-search>
        <ul class="actions">
            <li class="action-element">
                <slot name="person-icon"></slot>
                <label>Perfil</label>
            </li>
            <li class="action-element">
                <slot name="heart-icon"></slot>
                <label>Favorito</label>
            </li>
            <a class="action-element" href="./cart.html">
                <slot name="cart-icon"></slot>
                <label>Cart</label>
            </a>
        </ul>
        <i class="menu bi bi-list"></i>
    </div>
`;

class NavbarPrimary extends HTMLElement {
    constructor(){
        super();

        this.attachShadow( { mode:"open" } );
        this.shadowRoot.appendChild( navbarPrimaryTemplate.content.cloneNode( true ) );

        this.menuToggle = this.shadowRoot.querySelector(".actions");

        var menuElement = this.shadowRoot.querySelector('.menu ');
        menuElement.addEventListener('click', this.onMenuNavbar.bind( this, menuElement ) );

    }

    onMenuNavbar( menuElement ) {        
        this.menuToggle.classList.toggle('activate')

        menuElement.classList.toggle('bi-list')
        menuElement.classList.toggle('bi-x')
    }

}

window.customElements.define( 'navbar-primary', NavbarPrimary )